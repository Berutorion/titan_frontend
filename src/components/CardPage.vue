<script setup>

</script>

<template>
        <div  class="card p-4">
    <div class=" image d-flex flex-column justify-content-center align-items-center">
      
      <slot class="name mt-3 " name="header">default header</slot>

        <div class="d-flex flex-row justify-content-center align-items-center gap-2 p-4">
            <slot name="body">default body</slot>
        </div>


        <slot name="footer">default footer</slot>
        <!-- <button class=" btn-secondary btncard">
            上班
        </button> -->
    </div>
  </div>
</template>

<style scoped>
.card {
    width: 350px;
    background-color: #efefef;
    border: none;
    cursor: pointer;
    transition: all 0.5s;
    height: 400px;
}

.image img {
    transition: all 0.5s
}

.card:hover .image img {
    transform: scale(1.5)
}



.name {
    font-size: 22px;
    font-weight: bold
}
</style>>
