<template>
  <div>
    <b-dropdown-item to="/board">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.board')">Board</span>
    </b-dropdown-item>
    <b-dropdown-item to="/task">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.task')">Task</span>
    </b-dropdown-item>
    <b-dropdown-item to="/tag">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.tag')">Tag</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
