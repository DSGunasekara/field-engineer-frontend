<template>
  <v-container>
    <v-form class="justify-center" ref="form" v-model="valid" lazy-validation>
      <v-btn text color="pink" @click="adminData">
        Demo Admin
      </v-btn>
      <v-btn text color="purple" @click="engData">
        Demo Engineer
      </v-btn>
      <v-btn text color="green" @click="cusData">
        Demo Customer
      </v-btn>
      <v-text-field
          v-model="email"
          label="Email"
          :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
      ></v-text-field>
      <v-btn text class="primary" @click="submit" :loading="loading"
      >Login</v-btn
      >
    </v-form>
    <v-snackbar top v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false"
        >Close</v-btn
        >
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",
  data: () => ({
    valid: true,
    email: "",
    password: "",
    show1: false,
    loading: false,
    snackbar: false,
    text: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  methods: {
    ...mapActions(["login"]),
    adminData(){
      this.email = "admin@gmail.com"
      this.password = "adsg1997"
    },
    engData(){
      this.email = "john@gmail.com"
      this.password = "adsg1997"
    },cusData(){
      this.email = "cusJohn@gmail.com"
      this.password = "adsg1997"
    },
    async submit() {
      const credentials = {
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      try {
        const response = await this.login(credentials);
        if(response !== 200){
          this.snackbar = true;
          this.loading = false;
          this.text = "Invalid credentials";
          this.email = "";
          this.password = "";
          return;
        }
        this.loading = false;
        this.snackbar = true;
        this.text = "Logged In successfully";

        await this.$router.push("/");

      }catch (error){
        console.log(error)
      }
    },
  },
  computed:{
    ...mapGetters(["getUserData"])
  }
};
</script>

<style>
</style>
