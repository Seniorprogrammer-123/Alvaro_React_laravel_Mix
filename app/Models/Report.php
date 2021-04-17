<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $table = 'reports';
    protected $fillable = [
        'id',
        'status',
        'motive',
        'dni_number',
        'nation',
        'firstname',
        'lastname',
        'middlename',
        'sex',
        'age',
        'married',
        'birthday',
        'address',
        'region',
        'city',
        'country',
        'phone',
        'health',
        'fever_above',
        'sore_throat',
        'myalgia',
        'pneumonia',
        'encephalitis',
        'couch',
        'lady_nasal',
        'respiratory_difficulty',
        'hypotention',
        'agusia',
        'anosmia',
        'headache',
        'tachypnea',
        'hypoxia',
        'ayanosis',
        'dehydration_food_refused',
        'hemodynamic_commitment',
        'consultation_respiratory',
        'base_disease',
        'disease',
        'vaccine_first',
        'vaccine_second',
        'symptom_date',
        'symptom_city',
        'symptom_country',
        'worker',
        'pregnant',
        'pregweek',
        'imagepath',
        'pdfpath',
        'email'
    ];
}
