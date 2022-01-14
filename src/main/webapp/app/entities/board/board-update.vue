<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="synergyDogApp.board.home.createOrEditLabel"
          data-cy="BoardCreateUpdateHeading"
          v-text="$t('synergyDogApp.board.home.createOrEditLabel')"
        >
          Create or edit a Board
        </h2>
        <div>
          <div class="form-group" v-if="board.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="board.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('synergyDogApp.board.name')" for="board-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="board-name"
              data-cy="name"
              :class="{ valid: !$v.board.name.$invalid, invalid: $v.board.name.$invalid }"
              v-model="$v.board.name.$model"
              required
            />
            <div v-if="$v.board.name.$anyDirty && $v.board.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.board.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.board.name.minLength" v-text="$t('entity.validation.minlength', { min: 3 })">
                This field is required to be at least 3 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('synergyDogApp.board.handle')" for="board-handle">Handle</label>
            <input
              type="text"
              class="form-control"
              name="handle"
              id="board-handle"
              data-cy="handle"
              :class="{ valid: !$v.board.handle.$invalid, invalid: $v.board.handle.$invalid }"
              v-model="$v.board.handle.$model"
              required
            />
            <div v-if="$v.board.handle.$anyDirty && $v.board.handle.$invalid">
              <small class="form-text text-danger" v-if="!$v.board.handle.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.board.handle.minLength" v-text="$t('entity.validation.minlength', { min: 2 })">
                This field is required to be at least 2 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('synergyDogApp.board.user')" for="board-user">User</label>
            <select class="form-control" id="board-user" data-cy="user" name="user" v-model="board.user">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="board.user && userOption.id === board.user.id ? board.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.login }}
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
            :disabled="$v.board.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./board-update.component.ts"></script>
