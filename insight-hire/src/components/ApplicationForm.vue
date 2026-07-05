<script setup>
import { ref, computed } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const namePattern = /^[a-zA-Z]+$/
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordPattern = /^(?=.*[$%^&*]).{8,}$/
const postcodePattern = /^\d{4}$/
const mobilePhonePattern = /^(04)\d{8}$/

const firstName = ref('')
const lastName = ref('')
const birthdate = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const streetAddress = ref('')
const suburb = ref('')
const postcode = ref('')
const mobileNo = ref('')
const jobCategory = ref('')
const showModal = ref(false)
const submitted = ref(false)

const birthdateTouched = ref(false)
const birthdateFocused = ref(false)

const firstNameError = computed(() => {
    if (!firstName.value) {
        return 'Field is required.'
    }

    if (!namePattern.test(firstName.value)) {
        return 'First name must be letters only.'
    }

    return ''
})

const lastNameError = computed(() => {
    if (!lastName.value) {
        return 'Field is required.'
    }

    if (!namePattern.test(lastName.value)) {
        return 'Last name must be letters only.'
    }

    return ''
})

const birthdateError = computed(() => {
    if (!birthdate.value) {
        return 'Field is required.'
    }

    const currentDate = new Date()
    const cuttoffDate = new Date(
        currentDate.getFullYear() - 16,
        currentDate.getMonth(),
        currentDate.getDate()
    )

    const inputDate = new Date(birthdate.value)

    if (inputDate > cuttoffDate) {
        return 'You must be at least 16 years old to register.'
    }

    return ''
})

function handleBirthdateFocus() {
    birthdateFocused.value = true
}

function handleBirthdateBlur() {
    if (birthdateFocused.value) {
        birthdateTouched.value = true
    }

    birthdateFocused.value = false
}

const usernameError = computed(() => {
    if (!username.value) {
        return 'Field is required.'
    }

    if (username.value.length < 3) {
        return 'Username must be at least 3 characters.'
    }

    return ''
})

const emailError = computed(() => {
    if (!email.value) {
        return 'Field is required.'
    }

    if (!emailPattern.test(email.value)) {
        return 'Invalid email.'
    }

    return ''
})

const passwordError = computed(() => {
    if (!password.value) {
        return 'Field is required.'
    }

    if (!passwordPattern.test(password.value)) {
        return 'Password must be at least 8 characters and contains at least 1 special character. Special characters are $, %, ^, &, *.' 
    }

    return ''
})

const passwordConfirmError = computed(() => {
    if (!passwordConfirm.value) {
        return 'Field is required.'
    }

    if (password.value != passwordConfirm.value) {
        return 'Password does not match.'
    }

    return ''
})

const streetAddressError = computed(() => {
    if (streetAddress.value && streetAddress.value.length > 40) {
        return 'Address must not be more than 40 characters.'
    }

    return ''
})

const suburbError = computed(() => {
    if (suburb.value && suburb.value.length > 20) {
        return 'Suburb must not be more than 20 characters.'
    }

    return ''
})

const postcodeError = computed(() => {
    if (!postcode.value) {
        return 'Field is required.'
    }

    if (!postcodePattern.test(postcode.value)) {
        return 'Postcode must be 4 numeric digits.' 
    }

    return ''
})

const mobileNoError = computed(() => {
    if (mobileNo.value && !mobilePhonePattern.test(mobileNo.value)) {
        return 'Phone number must be 10 digits and start with 04.' 
    }

    return ''
})

const jobCategoryError = computed(() => {
    if (!jobCategory.value) {
        return 'Field is required.'
    }

    return ''
})

const formErrors = computed(() => [
    firstNameError.value,
    lastNameError.value,
    birthdateError.value,
    usernameError.value,
    emailError.value,
    passwordError.value,
    passwordConfirmError.value,
    streetAddressError.value,
    suburbError.value,
    postcodeError.value,
    mobileNoError.value,
    jobCategoryError.value
])

const isFormValid = computed(() => {
    return formErrors.value.every(error => error === '')
})

function showErrorMsg(id) {
    const ele = document.getElementById(id)
    ele.classList.remove("d-none")
}

function togglePasswordInput(id) {
    const input = document.getElementById(id)

    const iconId = id === 'password' ? 'passwordToggleIcon' : 'passwordConfirmToggleIcon'

    const icon = document.getElementById(iconId)

    input.type = input.type === 'password' ? 'text' : 'password'

    icon.classList.toggle('fa-eye')
    icon.classList.toggle('fa-eye-slash')
}

function validateForm(event) {
    submitted.value = true

    document.querySelectorAll('.error-msg').forEach(element => {
        element.classList.remove('d-none')
    })

    if (!isFormValid.value) {
        return
    }

    event.currentTarget.submit()
}

</script>

<template>
    <section id="application-form">
        <div class="container py-5">
            <div class="application-heading mb-4 text-center">
                <p class="section-label mb-2">
                    Join our team
                </p>

                <h2 class="section-header mb-2">
                    Application Form
                </h2>

                <p class="section-description mb-0">
                    Complete the form below to submit your application.
                </p>
            </div>

            <form
                class="application-panel"
                method="post"
                action="http://mercury.swin.edu.au/it000000/formtest.php"
                novalidate
                @submit.prevent="validateForm"
            >
                <fieldset class="form-section">
                    <legend class="form-section-header">
                        <span class="section-icon">
                            <i class="fa-regular fa-user"></i>
                        </span>

                        <span>
                            <span class="form-section-title">
                                Personal information
                            </span>

                            <span class="form-section-subtitle">
                                Tell us a little about yourself.
                            </span>
                        </span>
                    </legend>

                    <div class="row g-4">
                        <div class="col-12 col-md-6">
                            <label for="firstName" class="form-label">
                                First name
                            </label>

                            <input
                                id="firstName"
                                v-model="firstName"
                                type="text"
                                name="firstName"
                                class="form-control"
                                :class="{ 'is-invalid': submitted && !!firstNameError }"
                                aria-describedby="firstNameError"
                                @blur="showErrorMsg('firstNameError')"
                            >

                            <small id="firstNameError" class="error-msg text-danger d-none">
                                {{ firstNameError }}
                            </small>
                        </div>

                        <div class="col-12 col-md-6">
                            <label for="lastName" class="form-label">
                                Last name
                            </label>

                            <input
                                id="lastName"
                                v-model="lastName"
                                type="text"
                                name="lastName"
                                class="form-control"
                                :class="{ 'is-invalid': submitted && !!lastNameError }"
                                aria-describedby="lastNameError"
                                @blur="showErrorMsg('lastNameError')"
                            >

                            <small id="lastNameError" class="error-msg text-danger d-none">
                                {{ lastNameError }}
                            </small>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label">
                                Birthdate
                            </label>

                            <VueDatePicker
                                v-model="birthdate"
                                :formats="{ input: 'dd/MM/yyyy' }"
                                :time-config="{ enableTimePicker: false }"
                                :max-date="new Date( new Date().getFullYear(), 0, 1)"
                                aria-describedby="birthdateError"
                                @focus="handleBirthdateFocus"
                                @blur="handleBirthdateBlur"
                            />

                            <small v-if="(birthdateTouched || submitted) && birthdateError" id="birthdateError" class="error-msg text-danger d-none">
                                {{ birthdateError }}
                            </small>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="form-section">
                    <legend class="form-section-header mt-2">
                        <span class="section-icon">
                            <i class="fa-solid fa-shield-halved"></i>
                        </span>

                        <span>
                            <span class="form-section-title">
                                Account details
                            </span>

                            <span class="form-section-subtitle">
                                Create your applicant account.
                            </span>
                        </span>
                    </legend>

                    <div class="row g-4">
                        <div class="col-12 col-md-6">
                            <label for="username" class="form-label">
                                Username
                            </label>

                            <input
                                id="username"
                                v-model="username"
                                type="text"
                                name="username"
                                class="form-control"
                                :class="{ 'is-invalid': submitted && !!usernameError }"
                                aria-describedby="usernameError"
                                @blur="showErrorMsg('usernameError')"
                            >

                            <small id="usernameError" class="error-msg text-danger d-none">
                                {{ usernameError }}
                            </small>
                        </div>

                        <div class="col-12 col-md-6">
                            <label for="email" class="form-label">
                                Email address
                            </label>

                            <input
                                id="email"
                                v-model="email"
                                type="email"
                                name="email"
                                class="form-control"
                                :class="{ 'is-invalid': submitted && !!emailError }"
                                aria-describedby="emailError"
                                @blur="showErrorMsg('emailError')"
                            >

                            <small id="emailError" class="error-msg text-danger d-none">
                                {{ emailError }}
                            </small>
                        </div>

                        <div class="col-12 col-md-6">
                            <label for="password" class="form-label">
                                Password
                            </label>

                            <div class="input-group form-input-group">
                                <input
                                    id="password"
                                    v-model="password"
                                    type="password"
                                    name="password"
                                    class="form-control"
                                    :class="{ 'is-invalid': submitted && !!passwordError }"
                                    aria-describedby="passwordError"
                                    @blur="showErrorMsg('passwordError')"
                                >

                                <button
                                    type="button"
                                    class="btn password-toggle"
                                    aria-label="Show or hide password"
                                    @click="togglePasswordInput('password')"
                                >
                                    <i id="passwordToggleIcon" class="fa-solid fa-eye"></i>
                                </button>
                            </div>

                            <small id="passwordError" class="error-msg text-danger d-none">
                                {{ passwordError }}
                            </small>
                        </div>

                        <div class="col-12 col-md-6">
                            <label for="passwordConfirm" class="form-label">
                                Confirm password
                            </label>

                            <div class="input-group form-input-group">
                                <input
                                    id="passwordConfirm"
                                    v-model="passwordConfirm"
                                    type="password"
                                    name="passwordConfirm"
                                    class="form-control"
                                    :class="{ 'is-invalid': submitted && !!passwordConfirmError }"
                                    aria-describedby="passwordConfirmError"
                                    @blur="showErrorMsg('passwordConfirmError')"
                                >

                                <button
                                    type="button"
                                    class="btn password-toggle"
                                    aria-label="Show or hide password"
                                    @click="togglePasswordInput('passwordConfirm')"
                                >
                                    <i id="passwordConfirmToggleIcon" class="fa-solid fa-eye"></i>
                                </button>
                            </div>

                            <small id="passwordConfirmError" class="error-msg text-danger d-none">
                                {{ passwordConfirmError }}
                            </small>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="form-section">
                    <legend class="form-section-header mt-2">
                        <span class="section-icon">
                            <i class="fa-regular fa-address-card"></i>
                        </span>

                        <span>
                            <span class="form-section-title">
                                Contact information
                            </span>

                            <span class="form-section-subtitle">
                                Enter your address and phone number.
                            </span>
                        </span>
                    </legend>

                    <div class="row g-4">
                        <div class="col-12 col-md-6">
                            <label for="streetAddress" class="form-label">
                                Street address
                            </label>

                            <input
                                id="streetAddress"
                                v-model="streetAddress"
                                type="text"
                                name="streetAddress"
                                class="form-control"
                                :class="{ 'is-invalid': submitted && !!streetAddressError }"
                                aria-describedby="streetAddressError"
                                @blur="showErrorMsg('streetAddressError')"
                            >

                            <small id="streetAddressError" class="error-msg text-danger d-none">
                                {{ streetAddressError }}
                            </small>
                        </div>

                        <div class="col-12 col-md-6">
                            <label for="suburb" class="form-label">
                                Suburb
                            </label>

                            <input
                                id="suburb"
                                v-model="suburb"
                                type="text"
                                name="suburb"
                                class="form-control"
                                :class="{ 'is-invalid': submitted && !!suburbError }"
                                aria-describedby="suburbError"
                                @blur="showErrorMsg('suburbError')"
                            >

                            <small id="suburbError" class="error-msg text-danger d-none">
                                {{ suburbError }}
                            </small>
                        </div>

                        <div class="col-12 col-md-6">
                            <label for="postcode" class="form-label">
                                Postcode
                            </label>

                            <input
                                id="postcode"
                                v-model="postcode"
                                type="text"
                                name="postcode"
                                class="form-control"
                                inputmode="numeric"
                                :class="{ 'is-invalid': submitted && !!postcodeError }"
                                aria-describedby="postcodeError"
                                @blur="showErrorMsg('postcodeError')"
                            >

                            <small id="postcodeError" class="error-msg text-danger d-none">
                                {{ postcodeError }}
                            </small>
                        </div>

                        <div class="col-12 col-md-6">
                            <label for="mobileNo" class="form-label">
                                Mobile phone
                            </label>

                            <input
                                id="mobileNo"
                                v-model="mobileNo"
                                type="tel"
                                name="mobileNo"
                                class="form-control"
                                :class="{ 'is-invalid': submitted && !!mobileNoError }"
                                aria-describedby="mobileNoError"
                                @blur="showErrorMsg('mobileNoError')"
                            >

                            <small id="mobileNoError" class="error-msg text-danger d-none">
                                {{ mobileNoError }}
                            </small>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="form-section">
                    <legend class="form-section-header mt-2">
                        <span class="section-icon">
                            <i class="fa-solid fa-briefcase"></i>
                        </span>

                        <span>
                            <span class="form-section-title">
                                Job preferences
                            </span>

                            <span class="form-section-subtitle">
                                Tell us which area interests you.
                            </span>
                        </span>
                    </legend>

                    <div class="row g-4">
                        <div class="col-12 col-md-6">
                            <label for="jobCategory" class="form-label">
                                Preferred job category
                            </label>

                            <select
                                id="jobCategory"
                                v-model="jobCategory"
                                class="form-select"
                                name="jobCategory"
                                :class="{ 'is-invalid': submitted && !!jobCategoryError }"
                                aria-describedby="jobCategoryError"
                                @blur="showErrorMsg('jobCategoryError')"
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                <option value="ai">AI</option>
                                <option value="ds">
                                    Data Science
                                </option>
                                <option value="softdev">
                                    Software Development
                                </option>
                                <option value="devops">
                                    DevOps
                                </option>
                                <option value="cybersec">
                                    Cyber Security
                                </option>
                            </select>

                            <small id="jobCategoryError" class="error-msg text-danger d-none">
                                {{ jobCategoryError }}
                            </small>
                        </div>
                    </div>
                </fieldset>

                <div class="form-actions">
                    <button type="button" class="btn terms-button" @click="showModal = true">
                        <i class="fa-regular fa-file-lines"></i>
                        Terms & Conditions
                    </button>

                    <button type="submit" class="btn submit-button">
                        Submit application
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>

                <div
                    v-if="showModal"
                    class="modal fade show d-block"
                    tabindex="-1"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="termsModalTitle"
                    @click.self="showModal = false"
                >
                    <div
                        class="modal-dialog modal-dialog-centered modal-lg"
                    >
                        <div class="modal-content terms-modal">
                            <div class="modal-header">
                                <div>
                                    <p class="section-label mb-1">
                                        Applicant Agreement
                                    </p>

                                    <h2 id="termsModalTitle" class="modal-title">
                                        Terms & Conditions
                                    </h2>
                                </div>

                                <button type="button" class="btn-close" aria-label="Close" @click="showModal = false"></button>
                            </div>

                            <div class="modal-body">
                                <p>
                                    Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit.
                                </p>

                                <p>
                                    Please review the application
                                    conditions before submitting your
                                    information.
                                </p>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn submit-button" @click="showModal = false">
                                    I Understand
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    v-if="showModal"
                    class="modal-backdrop fade show"
                ></div>
            </form>
        </div>
    </section>
</template>

<style scoped lang="scss" src="./ApplicationForm.scss">
</style>