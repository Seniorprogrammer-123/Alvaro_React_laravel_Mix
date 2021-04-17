<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            /*clinic*/
            $table->enum('motive', array('CONTRACT', 'JOB', 'TRAVEL', 'SHOWS_SYMPTOMS'))->default('CONTRACT');
            /*client*/
            $table->string('dni_number')->default('');
            $table->string('nation')->default('');
            $table->string('firstname')->default('');
            $table->string('lastname')->default('');
            $table->string('middlename')->default('');
            $table->enum('sex', array('M', 'F'))->default('M');
            $table->integer('age')->default(0);
            $table->enum('married', array('M', 'A'))->default('M');
            $table->date('birthday');
            $table->string('address')->default('');
            $table->string('region')->default('');
            $table->string('city')->default('');
            $table->string('country')->default('Chile');
            $table->string('phone')->default('');
            $table->enum('health', array('FONSANA', 'ISAPRE', 'PARTICULAR'))->default('FONSANA');
            /*clinic*/
            $table->date('symptom_date');
            $table->integer('pregnant', array('Y', 'N'))->default('N');
            $table->integer('pregweek')->default(0);
            $table->string('symptom_city')->default('');
            $table->string('symptom_country')->default('');
            /*symptoms*/
            $table->integer('fever_above')->default(0);
            $table->integer('sore_throat')->default(0);
            $table->integer('myalgia')->default(0);
            $table->integer('pneumonia')->default(0);
            $table->integer('encephalitis')->default(0);
            $table->integer('couch')->default(0);
            $table->integer('lady_nasal')->default(0);
            $table->integer('respiratory_difficulty')->default(0);
            $table->integer('hypotention')->default(0);
            $table->integer('agusia')->default(0);
            $table->integer('anosmia')->default(0);
            $table->integer('headache')->default(0);
            $table->integer('tachypnea')->default(0);
            $table->integer('hypoxia')->default(0);
            $table->integer('ayanosis')->default(0);
            $table->integer('dehydration_food_refused')->default(0);
            $table->integer('hemodynamic_commitment')->default(0);
            $table->integer('consultation_respiratory')->default(0);
            $table->integer('base_disease')->default(0);
            $table->string('disease')->default('');
            /*vaccine*/
            $table->date('vaccine_first');
            $table->date('vaccine_second');
            /** image path */
            $table->string('imagepath')->default('');
            $table->string('pdfpath')->default('');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reports');
    }
}
