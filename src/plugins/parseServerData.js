/*let xdxd = {
    "params": {
        "net": [
            {
                "iface": "lo",
                "ifaceName": "lo",
                "ip4": "127.0.0.1",
                "ip6": "::1",
                "mac": "",
                "internal": true,
                "virtual": false,
                "operstate": "unknown",
                "type": "virtual",
                "duplex": "",
                "mtu": 65536,
                "speed": -1,
                "dhcp": false,
                "dnsSuffix": "Unknown",
                "ieee8021xAuth": "Not defined",
                "ieee8021xState": "Disabled",
                "carrierChanges": 0
            },
            {
                "iface": "wlp2s0",
                "ifaceName": "wlp2s0",
                "ip4": "192.168.0.81",
                "ip6": "2a02:a31a:a239:ec80:59fd:9cd0:b1c1:fdc3",
                "mac": "7c:76:35:88:a0:8b",
                "internal": false,
                "virtual": false,
                "operstate": "up",
                "type": "wireless",
                "duplex": "",
                "mtu": 1500,
                "speed": -1,
                "dhcp": true,
                "dnsSuffix": "Unknown",
                "ieee8021xAuth": "Not defined",
                "ieee8021xState": "Disabled",
                "carrierChanges": 2
            }
        ],
        "current": {
            "avgload": 0.22,
            "currentload": 29.46755094742332,
            "currentload_user": 25.037278492142473,
            "currentload_system": 4.418271713170145,
            "currentload_nice": 0.012000742110699025,
            "currentload_idle": 70.53244905257668,
            "currentload_irq": 0,
            "raw_currentload": 651683700,
            "raw_currentload_user": 553706900,
            "raw_currentload_system": 97711400,
            "raw_currentload_nice": 265400,
            "raw_currentload_idle": 1559846200,
            "raw_currentload_irq": 0,
            "cpus": [
                {
                    "load": 29.403808523563278,
                    "load_user": 25.88439499256368,
                    "load_system": 3.5081813985774555,
                    "load_nice": 0.011232132422146154,
                    "load_idle": 70.59619147643672,
                    "load_irq": 0,
                    "raw_load": 81414500,
                    "raw_load_user": 71669800,
                    "raw_load_system": 9713600,
                    "raw_load_nice": 31100,
                    "raw_load_idle": 195469700,
                    "raw_load_irq": 0
                },
                {
                    "load": 29.930395941082516,
                    "load_user": 25.60559724056069,
                    "load_system": 4.311858858857773,
                    "load_nice": 0.012939841664049179,
                    "load_idle": 70.06960405891749,
                    "load_irq": 0,
                    "raw_load": 82806900,
                    "raw_load_user": 70841700,
                    "raw_load_system": 11929400,
                    "raw_load_nice": 35800,
                    "raw_load_idle": 193858000,
                    "raw_load_irq": 0
                },
                {
                    "load": 29.32155162422731,
                    "load_user": 25.726382875940036,
                    "load_system": 3.586792441249413,
                    "load_nice": 0.008376307037867046,
                    "load_idle": 70.67844837577269,
                    "load_irq": 0,
                    "raw_load": 81212400,
                    "raw_load_user": 71254800,
                    "raw_load_system": 9934400,
                    "raw_load_nice": 23200,
                    "raw_load_idle": 195759300,
                    "raw_load_irq": 0
                },
                {
                    "load": 29.462683926730776,
                    "load_user": 25.887424475184893,
                    "load_system": 3.5636701043582804,
                    "load_nice": 0.011589347187597594,
                    "load_idle": 70.53731607326922,
                    "load_irq": 0,
                    "raw_load": 81605300,
                    "raw_load_user": 71702600,
                    "raw_load_system": 9870600,
                    "raw_load_nice": 32100,
                    "raw_load_idle": 195373200,
                    "raw_load_irq": 0
                },
                {
                    "load": 30.033605867610042,
                    "load_user": 20.991418729840586,
                    "load_system": 9.030687030982747,
                    "load_nice": 0.011500106786705877,
                    "load_idle": 69.96639413238996,
                    "load_irq": 0,
                    "raw_load": 82265200,
                    "raw_load_user": 57497700,
                    "raw_load_system": 24736000,
                    "raw_load_nice": 31500,
                    "raw_load_idle": 191645300,
                    "raw_load_irq": 0
                },
                {
                    "load": 29.167577623456175,
                    "load_user": 25.410906257758192,
                    "load_system": 3.7471673008130493,
                    "load_nice": 0.009504064884937574,
                    "load_idle": 70.83242237654382,
                    "load_irq": 0,
                    "raw_load": 80713600,
                    "raw_load_user": 70318000,
                    "raw_load_system": 10369300,
                    "raw_load_nice": 26300,
                    "raw_load_idle": 196010100,
                    "raw_load_irq": 0
                },
                {
                    "load": 29.25155977013115,
                    "load_user": 25.43852324047554,
                    "load_system": 3.795576213916703,
                    "load_nice": 0.017460315738902124,
                    "load_idle": 70.74844022986885,
                    "load_irq": 0,
                    "raw_load": 80917800,
                    "raw_load_user": 70369900,
                    "raw_load_system": 10499600,
                    "raw_load_nice": 48300,
                    "raw_load_idle": 195709500,
                    "raw_load_irq": 0
                },
                {
                    "load": 29.175222233984936,
                    "load_user": 25.310773493139227,
                    "load_system": 3.851044065251504,
                    "load_nice": 0.013404675594204699,
                    "load_idle": 70.82477776601507,
                    "load_irq": 0,
                    "raw_load": 80748000,
                    "raw_load_user": 70052400,
                    "raw_load_system": 10658500,
                    "raw_load_nice": 37100,
                    "raw_load_idle": 196021100,
                    "raw_load_irq": 0
                }
            ]
        },
        "mem": {
            "total": 16676839424,
            "free": 620326912,
            "used": 16056512512,
            "active": 10434412544,
            "available": 6242426880,
            "buffers": 708775936,
            "cached": 4558684160,
            "slab": 679587840,
            "buffcache": 5947047936,
            "swaptotal": 2147479552,
            "swapused": 0,
            "swapfree": 2147479552
        },
        "cpu": {
            "manufacturer": "Intel®",
            "brand": "Core™ i7-7700HQ",
            "vendor": "GenuineIntel",
            "family": "6",
            "model": "158",
            "stepping": "9",
            "revision": "",
            "voltage": "",
            "speed": "2.80",
            "speedmin": "0.80",
            "speedmax": "3.80",
            "governor": "powersave",
            "cores": 8,
            "physicalCores": 4,
            "processors": 1,
            "socket": "",
            "cache": {
                "l1d": 131072,
                "l1i": 131072,
                "l2": 1,
                "l3": 6
            }
        },
        "image": {
            "available": 19646423040,
            "free": 23924350976,
            "total": 83348619264
        },
        "imageTh": {
            "available": 19646423040,
            "free": 23924350976,
            "total": 83348619264
        },
        "audio": {
            "available": 19646423040,
            "free": 23924350976,
            "total": 83348619264
        },
        "audioTh": {
            "available": 19646423040,
            "free": 23924350976,
            "total": 83348619264
        },
        "video": {
            "available": 19646423040,
            "free": 23924350976,
            "total": 83348619264
        },
        "videoTh": {
            "available": 19646423040,
            "free": 23924350976,
            "total": 83348619264
        }
    }
}*/
export default function parse(data){
    let net = []
    for(let netObj of data.net){
        if(netObj.ip4 != "127.0.0.1") net.push(netObj)
    }
    let cpuInfo = {}
    cpuInfo.brand = data.cpu.brand
    cpuInfo.speed = data.cpu.speed
    
    let currentCPU = {}
    currentCPU.load = data.current.avgload
    currentCPU.cpus = []
    for(let cpu of data.current.cpus){
         currentCPU.cpus.push(cpu.load)
    }
    
    let mem = {}
    mem.total = data.mem.total
    mem.free = data.mem.free
    mem.used = data.mem.used      
    
    let disk = {}
    disk.video = data.video
    disk.videoTh = data.videoTh
    disk.audio = data.audio
    disk.audioTh = data.audioTh
    disk.image = data.image
    disk.imageTh = data.imageTh
    
    return {
        cpu:{   cpuInfo: cpuInfo,
                current: currentCPU,
        },
        memory: mem,
        disk: disk,
        network: net,
    }
}