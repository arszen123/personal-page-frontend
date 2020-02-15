import {Validators} from "@angular/forms";

export const form = {
  personal_data: {
    elements: {
      first_name: {
        type: 'text',
        placeholder: 'First name',
        required: true,
        value: '',
        validators: [Validators.required],
        errors: {
          required: 'First name is required'
        }
      },
      last_name: {
        type: 'text',
        placeholder: 'Last name',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'Last name is required'
        }
      },
      birth_date: {
        type: 'datepicker',
        placeholder: 'Birth date',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'Birth date is required'
        }
      },
      birth_place: {
        type: 'text',
        placeholder: 'Birth place'
      },
      living_place: {
        type: 'text',
        placeholder: 'Living place'
      }
    },
    order: [
      'first_name',
      'last_name',
      'birth_date',
      'birth_place',
      'living_place',
    ]
  }
};
