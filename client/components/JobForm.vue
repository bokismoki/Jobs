<template>
  <form class="job-form mt-10 max-w-sm mx-auto lg:max-w-md xl:max-w-lg" @submit.prevent="upload">
    <div
      class="text-red-600 mb-5 font-semibold"
      v-if="hasErrors"
    >Make sure all required fields are filled in correctly.</div>
    <div>
      <label class="block mb-1 text-white text-sm font-semibold" for="job-title">
        Job title:
        <span class="text-vgreen font-black">*</span>
        <ImportantMessage
          msg="Please use keywords such as: 'UI', 'Frontend', 'Junior', 'Remote', etc in the title for the more efficient search of your job offer."
        />
      </label>
      <input
        class="rounded-sm mt-1 px-2 py-1 w-full placeholder-vblue"
        id="job-title"
        type="text"
        placeholder="E.g 'Junior frontend developer - MEVN stack - USA'"
        v-model="job.title"
      />
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.job.title.maxLength"
      >Maximum characters allowed: {{$v.job.title.$params.maxLength.max}}</div>
    </div>
    <div class="mt-5">
      <label class="block mb-1 text-white text-sm font-semibold" for="job-link">
        Job post url:
        <span class="text-vgreen font-black">*</span>
        <ImportantMessage
          msg="This url will be used as the direct connection between this job post and the same job offer on your company's site."
        />
      </label>
      <input
        class="rounded-sm mt-1 px-2 py-1 w-full placeholder-vblue"
        id="job-link"
        type="url"
        placeholder="job post url"
        v-model="job.job_link"
      />
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.job.job_link.url"
      >Please enter a valid url</div>
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.job.job_link.maxLength"
      >Maximum characters allowed: {{$v.job.job_link.$params.maxLength.max}}</div>
    </div>
    <div class="mt-5">
      <label class="block mb-1 text-white text-sm font-semibold" for="job-desc">
        Job description:
        <span class="text-vgreen font-black">*</span>
        <ImportantMessage
          msg="Please describe in a few lines what kind of employee you are looking for, skills, responsibilities, experience and similar."
        />
      </label>
      <textarea
        class="rounded mt-1 px-2 py-1 w-full placeholder-vblue"
        id="job-desc"
        v-model="job.description"
        placeholder="job description"
      ></textarea>
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.job.description.maxLength"
      >Maximum characters allowed: {{$v.job.description.$params.maxLength.max}}</div>
    </div>
    <ImportantMessage
      class="mt-5"
      msg="After successful creation, there is still 1 step left before your potential employee can see this post - the admin approval. After admin approves your post, it will automatically be uploaded to our site and you will get an email confirmation that everything went well."
    />
    <button
      type="submit"
      class="bg-vgreen text-white px-5 py-2 rounded-sm mt-5 uppercase text-sm font-bold tracking-wider"
    >Create job offer</button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, maxLength, url } from 'vuelidate/lib/validators'

export default {
  name: 'JobForm',
  components: {
    ImportantMessage: () =>
      import(
        /*webpackChunkName: 'important-message'*/ '~/components/ImportantMessage'
      )
  },
  data() {
    return {
      job: {
        title: '',
        job_link: '',
        description: ''
      },
      hasErrors: false
    }
  },
  validations: {
    job: {
      title: {
        required,
        maxLength: maxLength(50)
      },
      job_link: {
        required,
        url,
        maxLength: maxLength(255)
      },
      description: {
        required,
        maxLength: 255
      }
    }
  },
  methods: {
    async upload() {
      try {
        this.$v.job.$touch()
        if (this.$v.job.$anyError) {
          this.hasErrors = true
        } else {
          const response = await this.$axios.post(
            '/job',
            { ...this.job, companyId: this.accountId },
            {
              headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
              }
            }
          )
          if (response.status === 201) {
            this.$router.push({ name: 'jobs' })
            this.$store.dispatch('setPopupMsg', {
              success: true,
              msg: 'New job post successfully created'
            })
          }
        }
      } catch (err) {
        console.error(err)
        this.$store.dispatch('setPopupMsg', {
          success: false,
          msg: 'Error while creating new job post'
        })
      }
    }
  },
  computed: {
    ...mapGetters(['accountId'])
  },
  watch: {
    job: {
      deep: true,
      handler() {
        if (this.hasErrors) {
          this.hasErrors = false
        }
      }
    }
  }
}
</script>

<style scoped>
textarea {
  min-height: 100px;
  max-height: 250px;
}
</style>