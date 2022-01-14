<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="board">
        <h2 class="jh-entity-heading" data-cy="boardDetailsHeading">
          <span v-text="$t('synergyDogApp.board.detail.title')">Board</span> {{ board.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('synergyDogApp.board.name')">Name</span>
          </dt>
          <dd>
            <span>{{ board.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('synergyDogApp.board.handle')">Handle</span>
          </dt>
          <dd>
            <span>{{ board.handle }}</span>
          </dd>
          <dt>
            <span v-text="$t('synergyDogApp.board.user')">User</span>
          </dt>
          <dd>
            {{ board.user ? board.user.login : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="board.id" :to="{ name: 'BoardEdit', params: { boardId: board.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./board-details.component.ts"></script>
