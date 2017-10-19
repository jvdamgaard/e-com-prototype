<template>
  <div
    :class="[
      $style.container,
      { [$style.active]: this.state.departmentNavActive }
    ]"
    @click.self="closeNav"
  >
    <grid
      :class="$style.grid"
      @click.native.self="closeNav"
    >
      <grid-col
        mobile="11"
        tablet="4"
        laptop="3"
        dekstop="2"
        :class="$style.mainContainer"
        @mouseover.native="enterMain"
        @mouseleave.native="leaveMain"
      >
        <main-departments
          :departments="enhancedDepartments"
          :expandDepartment="expandDepartment"
          :setNextDepartment="setNextDepartment"
          :activeDepartment="activeDepartment"
        />
      </grid-col>
      <grid-col
        v-for="department in enhancedDepartments"
        v-show="department.titel === activeDepartment"
        mobile="8"
        laptop="9"
        dekstop="10"
        :class="$style.subDepartmentsGrid"
        @mouseover.native="setNextDepartment(department.titel); enterSub();"
        @mouseleave.native="leaveSub();"
        :key="department.titel"
      >
        <sub-departments
          :colOneDepartments="department.col1.subDepartments"
          :colTwoDepartments="department.col2.subDepartments"
          :promotion="department.promotion"
          :brands="department.brands"
        />
      </grid-col>
    </grid>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import debounce from 'lodash/debounce';
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import MainDepartments from './DepartmentNavigationMainDepartments.vue';
import SubDepartments from './DepartmentNavigationSubDepartments.vue';
import Group from './DepartmentNavigationGroup.vue';
import Btn from './Btn.vue';

export default {
  components: {
    Grid,
    GridCol,
    MainDepartments,
    SubDepartments,
    Btn,
    Group,
  },
  data() {
    return {
      activeDepartment: null,
      nextDepartment: null,
      hoverMain: false,
      hoverSub: false,
      departments: [],
    };
  },
  computed: {
    ...mapState(['state']),
    enhancedDepartments() {
      return this.departments.map((department) => {
        const col1 = {
          subDepartments: [],
          count: 0,
        };
        const col2 = {
          subDepartments: [],
          count: 0,
        };

        department.subDepartments.forEach((subDepartment) => {
          if (col1.count <= col2.count) {
            col1.subDepartments.push(subDepartment);
            col1.count += subDepartment.subDepartments.length + 1;
          } else {
            col2.subDepartments.push(subDepartment);
            col2.count += subDepartment.subDepartments.length + 1;
          }
        });

        return {
          ...department,
          col1,
          col2,
        };
      });
    },
  },
  created() {
    if (!process.browser) { return; }
    fetch('https://jvdamgaard.github.io/e-com-prototype/json/departments.json').then(response => response.json()).then((departments) => {
      this.departments = departments;
    });
  },
  methods: {
    ...mapActions({
      closeDepartmentNav: 'state/closeDepartmentNav',
    }),
    expandDepartment(titel) {
      this.activeDepartment = titel;
    },
    hasDepartmentChanged() {
      if (this.activeDepartment !== this.nextDepartment) {
        this.expandDepartment(this.nextDepartment);
      }
    },
    debounceDepartmentChange: debounce((hasDepartmentChanged) => {
      hasDepartmentChanged();
    }, 500),
    setNextDepartment(titel, event) {
      this.nextDepartment = titel;
      if (event && Math.abs(event.movementY) >= Math.abs(event.movementX) * 2) {
        this.hasDepartmentChanged();
      } else if (this.activeDepartment) {
        this.debounceDepartmentChange(this.hasDepartmentChanged);
      } else {
        this.hasDepartmentChanged();
      }
    },
    debounceCloseNav: debounce((closeNav) => {
      closeNav();
    }, 250),
    closeNav() {
      if (!this.hoverSub && !this.hoverMain) {
        this.closeDepartmentNav();
        this.expandDepartment(null);
      }
    },
    leaveSub() { this.hoverSub = false; this.debounceCloseNav(this.closeNav); },
    enterSub() { this.hoverSub = true; this.debounceCloseNav(this.closeNav); },
    leaveMain() { this.hoverMain = false; this.debounceCloseNav(this.closeNav); },
    enterMain() { this.hoverMain = true; this.debounceCloseNav(this.closeNav); },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  background-color: var(--color-pop-over-background);
  min-height: calc(100vh - 3.5rem);
  display: none;
}

@media (min-width: 48rem) {
  .active {
    display: block;
  }
}

.grid {
  margin: 0;
}

.mainContainer {
  composes: shadow from './styles.css';
}

.mainDepartments {
  padding: 1rem 0;
  min-height: 100%;
}

.mainDepartmentsHeading { padding: 1rem; }

.subDepartmentsGrid {
  composes: shadow from './styles.css';
}

.subDepartment {
  background-color: var(--color-grey-lighter);
  min-height: 100%;
  margin-left: -1rem;
  padding-left: 1rem;
  border-left: 1px solid var(--color-grey-light);
}

.promo {
  composes: bgImage from './styles.css';
  width: 100%;
  height: 100%;
  display: block;
  padding: 1rem;
}

.promoBtn {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
}

.brandIcon {
  height: 2rem;
  margin-right: 1rem;
  margin-top: 1rem;
  transition: transform 0.2s ease;
}
:global(.no-touch) .brandIcon:hover {
  transform: scale(1.2);
  z-index: 10;
}
</style>
