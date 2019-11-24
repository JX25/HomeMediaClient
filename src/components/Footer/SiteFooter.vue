<template>
  <footer class="fixed-bottom page-footer font-small">
  <div class="footer-copyright text-center py-3">
    <h6>Autor: Jakub Woźniak 2019 &copy; <br/> Praca inżynierska: Budowa Multimedialnego Serwera domowego i implementacja narzędzi do jego wykorzystania</h6>
  </div>
</footer>
</template>

<script>
export default {
    name: 'SiteFooter',
}
</script>

<style>
footer{
    margin: 0;
    position: fixed;
    bottom: 0;
    text-align: justify;
    padding: 25px;
    width: 100%;
    color: #fff;
    background-color: #5bc0de;
}
h6{
 color: #222222;
}
</style>