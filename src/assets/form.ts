import {Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

export const form: {
  [key: string]: {
    elements: {
      [key: string]: {
        type: string,
        placeholder?: string,
        required?: boolean,
        hidden?: boolean,
        validators?: Array<any>,
        value?: string,
        errors?: {
          [key: string]: string
        },
        options?: {
          [key: string]: string
        }
      }
    },
    order: Array<string>,
  }
} = {
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
  },
  experience: {
    elements: {
      id: {
        type: 'hidden',
        required: false
      },
      company_name: {
        type: 'text',
        placeholder: 'Company name',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'Company name is required'
        }
      },
      position: {
        type: 'text',
        placeholder: 'Position',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'Position is required'
        }
      },
      description: {
        type: 'text',
        placeholder: 'Description',
      },
      is_current: {
        type: 'toggle',
        placeholder: 'is currently working here',
        required: false
      },
      from: {
        type: 'datepicker',
        placeholder: 'From',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'From is required'
        }
      },
      to: {
        type: 'datepicker',
        placeholder: 'To',
        required: true,
        // validators: [Validators.required],
        errors: {
          required: 'To is required'
        }
      }
    },
    order: [
      'id',
      'company_name',
      'position',
      'description',
      'is_current',
      'from',
      'to'
    ]
  },
  education: {
    elements: {
      id: {
        type: 'hidden',
        required: false
      },
      type: {
        type: 'select',
        placeholder: 'Type',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'Type is required',
        },
        options: {
          base: 'Base',
          high: 'High',
          uni: 'Uni',
          online: 'Online',
        }
      },
      institute: {
        type: 'text',
        placeholder: 'Institute',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'Institute is required',
        },
      },
      specialization: {
        type: 'text',
        placeholder: 'Specialization',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'Specialization is required',
        },
      },
      from: {
        type: 'datepicker',
        placeholder: 'From',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'From is required'
        }
      },
      to: {
        type: 'datepicker',
        placeholder: 'To',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'To is required'
        }
      }
    },
    order: [
      'id',
      'type',
      'institute',
      'specialization',
      'from',
      'to',
    ]
  },
  language: {
    elements: {
      id: {
        type: 'hidden',
        required: false
      },
      lang_id: {
        type: 'select',
        placeholder: 'Language',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'Language is required',
        },
        //@todo add langauges
        options: {
          'hu': 'Hungary',
          'en': 'English',
        }
      },
      lang_level_id: {
        type: 'select',
        placeholder: 'Language level',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'Language level is required',
        },
        options: {
          basic: 'basic',
          conversant: 'conversant',
          proficient: 'proficient',
          fluent: 'fluent',
          native: 'native',
          bilingual: 'bilingual'
        }
      }
    },
    order: [
      'id',
      'lang_id',
      'lang_level_id'
    ]
  },
  contact: {
    elements: {
      id: {
        type: 'hidden',
        required: false
      },
      type: {
        type: 'select',
        placeholder: 'Type',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'Type is required',
        },
        options: {
          email: 'Email',
          phone: 'Phone',
          url: 'Url',
          other: 'Other',
        }
      },
      other_type: {
        type: 'text',
        placeholder: 'Type',
        required: false,
      },
      value: {
        type: 'text',
        placeholder: 'Value',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'Type is required',
        },
      },
    },
    order: [
      'id',
      'type',
      'other_type',
      'value'
    ]
  },
  skill: {
    elements: {
      skill: {
        type: 'chip',
        placeholder: 'Skill',
        required: true,
        validators: [Validators.required],
        errors: {
          required: 'Skill is required',
        },
      }
    },
    order: [
      'skill',
    ]
  }
};
