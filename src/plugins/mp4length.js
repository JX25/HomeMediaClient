import fs from 'fs'

export function mp4length(file){
    const buff = new Buffer(100);
    let output = {}
    fs.open(file, 'r', function(err, fd) {
      fs.read(fd, buff, 0, 100, 0, function(err, bytesRead, buffer) {
        const start = buffer.indexOf(new Buffer('mvhd')) + 17;
        const timeScale = buffer.readUInt32BE(start, 4);
        const duration = buffer.readUInt32BE(start + 4, 4);
        const videoLength = Math.floor(duration/timeScale);
        output =  {
            time_scale: timeScale,
            duration: duration,
            video_length: videoLength
        }

      });
    });
    return output
}