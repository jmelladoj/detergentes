<template v-if="menu==0"> 
    <dashboard></dashboard>
</template>

<template v-if="menu==1"> 
    <sucursal></sucursal>
</template>

<template v-if="menu==2">
    <usuario></usuario>
</template>

<template v-if="menu==3">
    <categoria-producto></categoria-producto>
</template>

<template v-if="menu==4">
    <producto></producto>
</template>

<template v-if="menu==5">
    <cliente></cliente>
</template>

<template v-if="menu==6">
    <categoria-cliente></categoria-cliente>
</template>

<template v-if="menu==7">
    <detalle-ventas></detalle-ventas>
</template>

<template v-if="menu==8">
    <productos-criticos></productos-criticos>
</template>

<template v-if="menu==9">
    <productos-stock></productos-stock>
</template>

<template v-if="menu==10">
    <empresa></empresa>
</template>

<template v-if="menu==11">
    <cotizacion></cotizacion>
</template>

<template v-if="menu==12">
    <orden-compra></orden-compra>
</template>

<template v-if="menu==13">
    <venta-normal></venta-normal>
</template>

<template v-if="menu==14">
    <venta-premium></venta-premium>
</template>

<template v-if="menu==15">
    <pendientes></pendientes>
</template>

<template v-if="menu==16">
    <stock-manual></stock-manual>
</template>