<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="task">
        <h2 class="jh-entity-heading" data-cy="taskDetailsHeading">
          <span v-text="$t('synergyDogApp.task.detail.title')">Task</span> {{ task.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('synergyDogApp.task.title')">Title</span>
          </dt>
          <dd>
            <span>{{ task.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('synergyDogApp.task.content')">Content</span>
          </dt>
          <dd>
            <span>{{ task.content }}</span>
          </dd>
          <dt>
            <span v-text="$t('synergyDogApp.task.date')">Date</span>
          </dt>
          <dd>
            <span v-if="task.date">{{ $d(Date.parse(task.date), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('synergyDogApp.task.board')">Board</span>
          </dt>
          <dd>
            <div v-if="task.board">
              <router-link :to="{ name: 'BoardView', params: { boardId: task.board.id } }">{{ task.board.name }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('synergyDogApp.task.tag')">Tag</span>
          </dt>
          <dd>
            <span v-for="(tag, i) in task.tags" :key="tag.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'TagView', params: { tagId: tag.id } }">{{ tag.name }}</router-link>
            </span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="task.id" :to="{ name: 'TaskEdit', params: { taskId: task.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./task-details.component.ts"></script>
