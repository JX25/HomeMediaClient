<template>
  <div>
    <h3>Dodanie nowego filmu do bazy</h3>
    <div id="errorbox"></div>
    <div id="successbox"></div>
    <form action="uploadMovie">
      <table class="table">
        <tbody>
          <tr>
            <th>Tytuł</th>
            <td>123</td>
          </tr>
          <tr>
            <th>Opis filmu</th>
            <td>123</td>
          </tr>
          <tr>
            <th>Rok produkcji</th>
            <td>123</td>
          </tr>
          <tr>
            <th>Gatunek</th>
            <td>123</td>
          </tr>
          <tr>
            <th>Miniatura</th>
            <td>123</td>
          </tr>
          <tr>
            <th>Plik</th>
            <td>  <div class="custom-file">
    <input type="file" class="custom-file-input" accept=".mp4, .x-m4v, video/*" id="inputGroupFile01"
      aria-describedby="inputGroupFileAddon01">
    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
  </div></td>
          </tr>
          <tr>
            <th>Wiek (PEGI)</th>
            <td>123</td>
          </tr>
          <tr>
            <th>Długość</th>
            <td>123</td>
          </tr>
          <tr>
            <th>Język</th>
            <td>123</td>
          </tr>
          <tr>
            <th>Reżyser/Reżyserzy</th>
            <td>123</td>
          </tr>
          <tr>
            <th>Aktorzy</th>
            <td>123</td>
          </tr>
          <tr>
            <th>Słowa kluczowe</th>
            <td>123</td>
          </tr>
        </tbody>
      </table>
      <b-button variant="primary">Dodaj film</b-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddMovie"
};
</script>

<style>
</style>