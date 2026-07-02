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
    if (!mobilePhonePattern.test(mobileNo.value)) {
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
    const ele = document.getElementById(id)
    const passwordType = ele.getAttribute('type')
    const icon = id == 'password' ? document.querySelector("#password + button > #passwordToggleIcon") : document.querySelector("#passwordConfirm + button > #passwordToggleIcon")

    ele.setAttribute('type', passwordType === 'password' ? 'text' : 'password')
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
            <h4 class="section-header text-center mb-5">Application Form</h4>
            <form @submit.prevent="validateForm" method="post" action="http://mercury.swin.edu.au/it000000/formtest.php" novalidate>
                <fieldset class="mb-4">
                    <legend class="mb-3">Personal Information</legend>

                    <div class="row">
                        <div class="col-6 mb-3 pe-4">
                            <label for="firstName" class="form-label">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                class="form-control"
                                aria-describedby="firstNameError"
                                v-model="firstName"
                                @blur="showErrorMsg('firstNameError')"
                            />
                            <small id="firstNameError" class="error-msg text-danger d-none">{{ firstNameError }}</small>
                        </div>

                        <div class="col-6 mb-3 pe-4">
                            <label for="lastName" class="form-label">First Name</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                class="form-control"
                                aria-describedby="lastNameError"
                                v-model="lastName"
                                @blur="showErrorMsg('lastNameError')"
                            />
                            <small id="lastNameError" class="error-msg text-danger d-none">{{ lastNameError }}</small>
                        </div>


                        <div class="col-6 mb-3 pe-4">
                            <label for="lastName" class="form-label">Birthdate</label>
                            <VueDatePicker v-model="birthdate"
                                        :formats="{ input: 'dd/MM/yyyy' }"
                                        :time-config="{ enableTimePicker: false }" 
                                        :max-date="new Date(new Date().getFullYear(), 0, 1)"
                                        @blur="showErrorMsg('birthdateError')"
                                        aria-describedby="birthdateError"
                            >
                            </VueDatePicker>
                            <small id="birthdateError" class="error-msg text-danger d-none">{{ birthdateError }}</small>
                        </div>
                    </div>          
                </fieldset>

                <fieldset class="mb-4">
                    <legend class="mb-3">Account Details</legend>

                    <div class="row">
                        <div class="col-6 mb-3 pe-4">
                            <label for="username" class="form-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                class="form-control"
                                aria-describedby="usernameError"
                                v-model="username"
                                @blur="showErrorMsg('usernameError')"
                            />
                            <small id="usernameError" class="error-msg text-danger d-none">{{ usernameError }}</small>
                        </div>

                        <div class="col-6 mb-3 pe-4">
                            <label for="email" class="form-label">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                class="form-control"
                                aria-describedby="emailError"
                                v-model="email"
                                @blur="showErrorMsg('emailError')"
                            />
                            <small id="emailError" class="error-msg text-danger d-none">{{ emailError }}</small>
                        </div>


                        <div class="col-6 mb-3 pe-4">
                            <label for="lastName" class="form-label">Password</label>
                            <div class="input-group">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    class="form-control"
                                    aria-describedby="passwordError"
                                    v-model="password"
                                    @blur="showErrorMsg('passwordError')"
                                />
                                <button class="btn btn-outline-secondary btn-password-toggle" type="button" @click="togglePasswordInput('password')">
                                    <i id="passwordToggleIcon" class="fa-solid fa-eye"></i>
                                </button>
                            </div>
                            <small id="passwordError" class="error-msg text-danger d-none">{{ passwordError }}</small>
                        </div>

                        <div class="col-6 mb-3 pe-4">
                            <label for="lastName" class="form-label">Confirm Password</label>
                            <div class="input-group">
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    id="passwordConfirm"
                                    class="form-control"
                                    aria-describedby="passwordConfirmError"
                                    v-model="passwordConfirm"
                                    @blur="showErrorMsg('passwordConfirmError')"
                                />
                                <button class="btn btn-outline-secondary btn-password-toggle" type="button" @click="togglePasswordInput('passwordConfirm')">
                                    <i id="passwordToggleIcon" class="fa-solid fa-eye"></i>
                                </button>
                            </div>
                            <small id="passwordConfirmError" class="error-msg text-danger d-none">{{ passwordConfirmError }}</small>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="mb-4">
                    <legend class="mb-3">Address</legend>

                    <div class="row">
                        <div class="col-6 mb-3 pe-4">
                            <label for="firstName" class="form-label">Street Address</label>
                            <input
                                type="text"
                                name="streetAddress"
                                id="streetAddress"
                                class="form-control"
                                aria-describedby="streetAddressError"
                                v-model="streetAddress"
                                @blur="showErrorMsg('streetAddressError')"
                            />
                            <small id="streetAddressError" class="error-msg text-danger d-none">{{ streetAddressError }}</small>
                        </div>

                        <div class="col-6 mb-3 pe-4">
                            <label for="lastName" class="form-label">Suburb</label>
                            <input
                                type="text"
                                name="suburb"
                                id="suburb"
                                class="form-control"
                                aria-describedby="suburbError"
                                v-model="suburb"
                                @blur="showErrorMsg('suburbError')"
                            />
                            <small id="suburbError" class="error-msg text-danger d-none">{{ suburbError }}</small>
                        </div>


                        <div class="col-6 mb-3 pe-4">
                            <label for="lastName" class="form-label">Postcode</label>
                            <input
                                type="text"
                                name="postcode"
                                id="postcode"
                                class="form-control"
                                aria-describedby="postcodeError"
                                v-model="postcode"
                                @blur="showErrorMsg('postcodeError')"
                            />
                            <small id="postcodeError" class="error-msg text-danger d-none">{{ postcodeError }}</small>
                        </div>

                        <div class="col-6 mb-3 pe-4">
                            <label for="lastName" class="form-label">Mobile phone</label>
                            <input
                                type="text"
                                name="mobileNo"
                                id="mobileNo"
                                class="form-control"
                                aria-describedby="mobileNoError"
                                v-model="mobileNo"
                                @blur="showErrorMsg('mobileNoError')"
                            />
                            <small id="mobileNoError" class="error-msg text-danger d-none">{{ mobileNoError }}</small>
                        </div>
                    </div>          
                </fieldset>

                <div class="job-category-dropdown col-6 mb-3 pe-4">
                    <label for="jobCategory" class="form-label">Preferred Job Category</label>
                    <select class="form-select" aria-label="Preferred Job Category" id="jobCategory" name="jobCategory" v-model="jobCategory">
                        <option></option>
                        <option value="ai">AI</option>
                        <option value="dev">Development</option>
                        <option value="business">Business</option>
                    </select>
                    <small id="jobCategoryError" class="error-msg text-danger d-none">{{ jobCategoryError }}</small>
                </div>

                <div class="btn-field d-flex justify-content-center align-items-center mt-5">
                    <button type="button" class="btn btn-secondary me-5" @click="showModal = true">Terms & Conditions</button>
                    <button type="submit" class="btn btn-primary">Submit</button>
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
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 id="termsModalTitle" class="modal-title">
                                    Terms & Conditions
                                </h2>

                                <button type="button" class="btn-close" aria-label="Close" @click="showModal = false"></button>
                            </div>

                            <div class="modal-body">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Provident officiis quis accusamus pariatur ducimus sint aliquam
                                    consequatur molestias vero, obcaecati repellendus minima excepturi
                                    aliquid iste ipsam. Enim, veniam magnam distinctio impedit quod
                                    ducimus illum maxime vitae cupiditate autem est velit.
                                    <br>
                                    <br>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                                    Tempore laboriosam fugit cum laudantium repellendus saepe vero commodi corrupti, voluptatibus 
                                    eligendi voluptatem distinctio debitis explicabo ea. Quasi tempora neque repudiandae nihil 
                                    voluptas molestiae iusto architecto reiciendis. Hic, excepturi incidunt quaerat beatae ullam 
                                    dignissimos porro! Laborum reiciendis cupiditate ex hic quibusdam corrupti quam, eius, ipsam dolores 
                                    voluptatibus magnam itaque necessitatibus voluptates, consectetur vel cumque voluptatum fuga adipisci. 
                                    Doloremque amet fugit eveniet dolores iure voluptatibus blanditiis quam molestias veniam illum non quos, et, 
                                    quaerat omnis culpa repellendus facere placeat eligendi architecto rem facilis obcaecati! 
                                    Blanditiis numquam nulla neque iure libero tempora consequatur minus.
                                </p>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" @click="showModal = false" >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="showModal" class="modal-backdrop fade show"></div>
            </form>
        </div>
    </section>
</template>