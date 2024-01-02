<script setup lang="ts">
import { ref } from 'vue'

const exerciseVisibilityState = ref({
  second: false,
  third: false,
})

const toggleExerciseVisibility = (exercise: keyof (typeof exerciseVisibilityState)['value']) => {
  exerciseVisibilityState.value = {
    ...exerciseVisibilityState.value,
    [exercise]: !exerciseVisibilityState.value[exercise],
  }
}
</script>

<template>
  <div class="mt-10 max-w-md justify-center">
    <h1 class="text-3xl font-extrabold leading-10 tracking-tight">Ready for the challenge?</h1>
    <div class="mt-8">
      <section>
        <h2 class="text-2xl font-bold leading-6">Exercise 1</h2>
        <div class="mt-5">
          <p>
            In the first exercise the goal would be to extend the current app with some additional output. For this you
            should integrate an public available Rest-API or GraphQL-API (see below for examples).
          </p>
          <p>
            It's your own decision what kind of output you use and in which way it will be displayed, but it should be
            in a creative way and you can use this possibility to show us your existing skills. For example you can add
            a list output as a starting point and show additional information in a detail page (or other output types).
          </p>
          <br />
          <p>Here are some examples for a public available API:</p>
          <ul>
            <li>
              <a
                class="cursor-pointer text-blue-600 hover:text-blue-800"
                href="https://github.com/APIs-guru/graphql-apis"
                target="_blank"
                >Public GraphQL-API Collection</a
              >
              (e.g.
              <a
                class="cursor-pointer text-blue-600 hover:text-blue-800"
                href="https://api.spacex.land/graphql/"
                target="_blank"
                >SpaceX-API</a
              >)
            </li>
            <li>
              <a
                class="cursor-pointer text-blue-600 hover:text-blue-800"
                href="https://github.com/public-apis/public-apis"
                target="_blank"
                >Public REST-API Collection</a
              >
              (e.g.
              <a
                class="cursor-pointer text-blue-600 hover:text-blue-800"
                href="https://pokeapi.co/docs/v2"
                target="_blank"
                >Pokemon-API</a
              >)
            </li>
          </ul>
          -
        </div>
        <div class="mt-5">
          <a class="cursor-pointer text-blue-600 hover:text-blue-800" @click="toggleExerciseVisibility('second')">
            {{ exerciseVisibilityState.second ? 'Hide the next exercise' : 'Show the next exercise' }}
          </a>
        </div>
      </section>
      <section v-if="exerciseVisibilityState.second" class="mt-10">
        <h2 class="text-2xl font-bold leading-6">Exercise 2</h2>
        <div class="mt-5">
          <p>
            As a second exercise you should add an global tost/notify handling in the already extended app. Maybe you
            can do this in a easy way with the new composition API.
          </p>
          <p>
            For example you can show a toast after something was fetched from the public API (which you implemented
            before) or also in error situations.
          </p>
        </div>
        <div class="mt-5">
          <a class="cursor-pointer text-blue-600 hover:text-blue-800" @click="toggleExerciseVisibility('third')">
            {{ exerciseVisibilityState.third ? 'Hide the next exercise' : 'Show the next exercise' }}
          </a>
        </div>
      </section>
      <section v-if="exerciseVisibilityState.third" class="mt-10">
        <h2 class="text-2xl font-bold leading-6">Exercise 3</h2>
        <div class="mt-5">
          <p>
            Please integrate a testing library in the current app. We're pretty sure that you have some components which
            needs to be tested.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
