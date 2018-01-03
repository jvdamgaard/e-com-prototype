<template>
  <div :class="$style.container">
    <article class="theme-None">
      <section>
        <grid full-width-until="mobile">
          <grid-col mobile="0" tablet="2" laptop="3" desktop="4"/>
          <grid-col tablet="8" laptop="6" desktop="4">
            <checkout-header-box
              header="Log ind"
              :filled="true"
              editLabel="Opret bruger"
              :edit="gotoCreateUser"
            />
            <checkout-form>
              <checkout-box>
                <p>
                  <label for="email">E-mail</label>
                  <input type="email" id="email" name="email" required autocomplete="email" v-model="email" ref="email">
                </p>
                <div :class="$style.password">
                  <label for="password">Kodeord</label>
                  <div :class="$style.showPassword" @click="togglePassword">{{showPassword ? 'skjul' : 'vis'}}</div>
                  <input v-if="!showPassword" type="password" id="password" name="password" required autocomplete="new-password" v-model="password">
                  <input v-if="showPassword" type="text" id="password" name="password" required autocomplete="new-password" v-model="password">
                </div>
                <btn
                  type="black"
                  height="large"
                  :loading="loggingIn"
                  :done="loggedIn"
                  @click.native="login"
                >Log ind</btn>
                <p class="dimmed" :class="$style.forgotPassword">
                  <nuxt-link :to="`/nulstil-kodeord?email=${email}`">Glemt kodeord?</nuxt-link>
                </p>
              </checkout-box>
            </checkout-form>
          </grid-col>
        </grid>
      </section>
    </article>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // eslint-disable-line
import Grid from '../../components/Grid.vue';
import GridCol from '../../components/GridCol.vue';
import CheckoutHeaderBox from '../../components/CheckoutHeaderBox.vue';
import CheckoutBox from '../../components/CheckoutBox.vue';
import CheckoutForm from '../../components/CheckoutForm.vue';
import Btn from '../../components/Btn.vue';

function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRedirectURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('callback') || '/mit-mrkt/';
}

export default {
  components: {
    Grid,
    GridCol,
    CheckoutHeaderBox,
    CheckoutBox,
    CheckoutForm,
    Btn,
  },
  data() {
    return {
      email: '',
      password: '',
      loggingIn: false,
      loggedIn: false,
      showPassword: false,
    };
  },
  fetch({ redirect }) {
    if (process.browser && window.auth.currentUser()) {
      redirect(getRedirectURL());
    }
  },
  beforeCreate() {
    if (process.browser && window.auth.currentUser()) {
      this.$router.push(getRedirectURL());
    }
  },
  methods: {
    ...mapActions({
      userLogin: 'user/login',
    }),
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    gotoCreateUser() {
      this.$router.push('/opret-bruger/');
    },
    async login() {
      if (this.loggingIn) {
        return;
      }
      this.loggingIn = true;
      try {
        await Promise.all([
          this.userLogin({ email: this.email, password: this.password }),
          sleep(1500),
        ]);
        this.$router.push(getRedirectURL());
      } catch (e) {
        console.error(e);
        this.loggingIn = false;
        this.loggedIn = false;
      }
    },
  },
};
</script>

<style module>
.container {
  margin: 5rem 0;
}

.password {
  position: relative;
}

.showPassword {
  composes: small from global;
  position: absolute;
  right: 0;
  line-height: 2.5rem;
  padding: 0 1rem;
  cursor: pointer;
}

.forgotPassword {
  text-align: center;
}
</style>
