<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="synergyDogApp.task.home.createOrEditLabel"
          data-cy="TaskCreateUpdateHeading"
          v-text="$t('synergyDogApp.task.home.createOrEditLabel')"
        >
          Create or edit a Task
        </h2>
        <div>
          <div class="form-group" v-if="task.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="task.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('synergyDogApp.task.title')" for="task-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="task-title"
              data-cy="title"
              :class="{ valid: !$v.task.title.$invalid, invalid: $v.task.title.$invalid }"
              v-model="$v.task.title.$model"
              required
            />
            <div v-if="$v.task.title.$anyDirty && $v.task.title.$invalid">
              <small class="form-text text-danger" v-if="!$v.task.title.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('synergyDogApp.task.content')" for="task-content">Content</label>
            <input
              type="text"
              class="form-control"
              name="content"
              id="task-content"
              data-cy="content"
              :class="{ valid: !$v.task.content.$invalid, invalid: $v.task.content.$invalid }"
              v-model="$v.task.content.$model"
              required
            />
            <div v-if="$v.task.content.$anyDirty && $v.task.content.$invalid">
              <small class="form-text text-danger" v-if="!$v.task.content.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('synergyDogApp.task.date')" for="task-date">Date</label>
            <div class="d-flex">
              <input
                id="task-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !$v.task.date.$invalid, invalid: $v.task.date.$invalid }"
                required
                :value="convertDateTimeFromServer($v.task.date.$model)"
                @change="updateZonedDateTimeField('date', $event)"
              />
            </div>
            <div v-if="$v.task.date.$anyDirty && $v.task.date.$invalid">
              <small class="form-text text-danger" v-if="!$v.task.date.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.task.date.ZonedDateTimelocal"
                v-text="$t('entity.validation.ZonedDateTimelocal')"
              >
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('synergyDogApp.task.board')" for="task-board">Board</label>
            <select class="form-control" id="task-board" data-cy="board" name="board" v-model="task.board">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="task.board && boardOption.id === task.board.id ? task.board : boardOption"
                v-for="boardOption in boards"
                :key="boardOption.id"
              >
                {{ boardOption.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label v-text="$t('synergyDogApp.task.tag')" for="task-tag">Tag</label>
            <select
              class="form-control"
              id="task-tags"
              data-cy="tag"
              multiple
              name="tag"
              v-if="task.tags !== undefined"
              v-model="task.tags"
            >
              <option v-bind:value="getSelected(task.tags, tagOption)" v-for="tagOption in tags" :key="tagOption.id">
                {{ tagOption.name }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.task.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./task-update.component.ts"></script>
