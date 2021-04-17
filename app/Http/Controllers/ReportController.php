<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use Twilio\Rest\Client;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $items = Report::orderBy('created_at', 'desc')->get();
        return $items->toJson();
    }

    /**
     * Sends sms to user using Twilio's programmable sms client
     * @param String $message Body of sms
     * @param Number $recipients Number of recipient
     */
    private function sendSMSMessage($message, $recipients)
    {
        $account_sid = getenv("TWILIO_SID");
        $auth_token = getenv("TWILIO_AUTH_TOKEN");
        $twilio_number = getenv("TWILIO_NUMBER");
        $client = new Client($account_sid, $auth_token);
        $recipients = "+56951009009";
        $client->messages->create($recipients, ['from' => $twilio_number, 'body' => $message]);
    }

    /**
     * Sends sms to user using Twilio's programmable sms client
     * @param String $message Body of WhatsApp
     * @param Number $recipients Number of recipient
     */
    private function sendWhatsAppMessage($message, $recipients)
    {
        $account_sid = getenv("TWILIO_SID");
        $auth_token = getenv("TWILIO_AUTH_TOKEN");
        // $twilio_number = getenv("TWILIO_NUMBER");
        $whatsapp_number = getenv("WHATSAPP_NUMBER");
        $client = new Client($account_sid, $auth_token);
        $recipients = "+56951009009";
        $client->messages->create("whatsapp:".$recipients, ["from" => "whatsapp:".$whatsapp_number, "body" => $message]);
    }

    /**
     * Send message to a selected users
     */
    public function sendCustomMessage(Request $request)
    {
        $validatedData = $request->validate([
            'users' => 'required|array',
            'body' => 'required',
        ]);
        $recipients = $validatedData["users"];
        // iterate over the array of recipients and send a twilio request for each
        foreach ($recipients as $recipient) {
            // $recipient = "+56951009009";
            $this->sendSMSMessage($validatedData["body"], $recipient);
        }
        return back()->with(['success' => "Messages on their way!"]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //

        $validatedData = $request->validate([
            'motive' => 'required',
            'dni_number' => 'required',
            'nation' => 'required',
            'firstname' => 'required',
            'lastname' => 'required',
            'middlename' => 'required',
            'email' => 'required',
            'sex' => 'required',
            'age' => 'required',
            'birthday' => 'required',
            'married' => 'required',
            'address' => 'required',
            'region' => 'required',
            'city' => 'required',
            'country' => 'required',
            'phone' => 'required',
            'health' => 'required',
            'fever_above' => 'required',
            'sore_throat' => 'required',
            'myalgia' => 'required',
            'pneumonia' => 'required',
            'encephalitis' => 'required',
            'couch' => 'required',
            'lady_nasal' => 'required',
            'respiratory_difficulty' => 'required',
            'hypotention' => 'required',
            'agusia' => 'required',
            'anosmia' => 'required',
            'headache' => 'required',
            'tachypnea' => 'required',
            'hypoxia' => 'required',
            'ayanosis' => 'required',
            'dehydration_food_refused' => 'required',
            'hemodynamic_commitment' => 'required',
            'consultation_respiratory' => 'required',
            'base_disease' => 'required',
            'disease' => '',
            'vaccine_first' => '',
            'vaccine_second' => '',
            'symptom_date' => '',
            'symptom_city' => '',
            'symptom_country' => '',
            'pregnant' => '',
            'pregweek' => '',
            'imagepath' => '',
        ]);



        $item = Report::create([
            'motive' => $validatedData['motive'],
            'dni_number' => $validatedData['dni_number'],
            'nation' => $validatedData['nation'],
            'firstname' => $validatedData['firstname'],
            'lastname' => $validatedData['lastname'],
            'middlename' => $validatedData['middlename'],
            'email' => $validatedData['email'],
            'sex' => $validatedData['sex'],
            'age' => $validatedData['age'],
            'birthday' => $validatedData['birthday'],
            'married' => $validatedData['married'],
            'address' => $validatedData['address'],
            'region' => $validatedData['region'],
            'city' => $validatedData['city'],
            'country' => $validatedData['country'],
            'phone' => $validatedData['phone'],
            'health' => $validatedData['health'],
            'fever_above' => $validatedData['fever_above'],
            'sore_throat' => $validatedData['sore_throat'],
            'myalgia' => $validatedData['myalgia'],
            'pneumonia' => $validatedData['pneumonia'],
            'encephalitis' => $validatedData['encephalitis'],
            'couch' => $validatedData['couch'],
            'lady_nasal' => $validatedData['lady_nasal'],
            'respiratory_difficulty' => $validatedData['respiratory_difficulty'],
            'hypotention' => $validatedData['hypotention'],
            'agusia' => $validatedData['agusia'],
            'anosmia' => $validatedData['anosmia'],
            'headache' => $validatedData['headache'],
            'tachypnea' => $validatedData['tachypnea'],
            'hypoxia' => $validatedData['hypoxia'],
            'ayanosis' => $validatedData['ayanosis'],
            'dehydration_food_refused' => $validatedData['dehydration_food_refused'],
            'hemodynamic_commitment' => $validatedData['hemodynamic_commitment'],
            'consultation_respiratory' => $validatedData['consultation_respiratory'],
            'base_disease' => $validatedData['base_disease'],
            'disease' => $validatedData['disease'],
            'vaccine_first' => $validatedData['vaccine_first'],
            'vaccine_second' => $validatedData['vaccine_second'],
            'symptom_date' => $validatedData['symptom_date'],
            'symptom_city' => $validatedData['symptom_city'],
            'symptom_country' => $validatedData['symptom_country'],
            'pregnant' => $validatedData['pregnant'],
            'pregweek' => $validatedData['pregweek'],
            'imagepath' => $validatedData['imagepath'],
        ]);
        die($item);
        return response()->json("Create Successed!");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $item = Report::find($id);

        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $item = Report::find($id);

        $validatedData = $request->validate([
            'motive' => 'required',
            'dni_number' => 'required',
            'nation' => 'required',
            'firstname' => 'required',
            'lastname' => 'required',
            'middlename' => 'required',
            'email' => 'required',
            'sex' => 'required',
            'age' => 'required',
            'birthday' => 'required',
            'married' => 'required',
            'address' => 'required',
            'region' => 'required',
            'city' => 'required',
            'country' => 'required',
            'phone' => 'required',
            'health' => 'required',
        ]);

        $item->motive = $request->motive == null ? 'CONTRACT' : $request->motive;
        $item->dni_number = $request->dni_number == null ? '' : $request->dni_number;
        $item->nation = $request->nation == null ? '' : $request->nation;
        $item->firstname = $request->firstname == null ? '' : $request->firstname;
        $item->lastname = $request->lastname == null ? '' : $request->lastname;
        $item->middlename = $request->middlename == null ? '' : $request->middlename;
        $item->email = $request->email == null ? '' : $request->email;
        $item->sex = $request->sex == null ? 'M' : $request->sex;
        $item->age = $request->age == null ? '0' : $request->age;
        $item->birthday = $request->birthday == null ? date("Y-m-d") : $request->birthday;
        $item->married = $request->married == null ? 'M' : $request->married;
        $item->address = $request->address == null ? '' : $request->address;
        $item->region = $request->region == null ? '' : $request->region;
        $item->city = $request->city == null ? '' : $request->city;
        $item->country = $request->country == null ? '' : $request->country;
        $item->phone = $request->phone == null ? '' : $request->phone;
        $item->health = $request->health == null ? 'ISAPRE' : $request->health;
        $item->fever_above = $request->fever_above  == null ? '0' : $request->fever_above;
        $item->sore_throat = $request->sore_throat  == null ? '0' : $request->sore_throat;
        $item->myalgia = $request->myalgia  == null ? '0' : $request->myalgia;
        $item->pneumonia = $request->pneumonia  == null ? '0' : $request->pneumonia;
        $item->encephalitis = $request->encephalitis  == null ? '0' : $request->encephalitis;
        $item->couch = $request->couch  == null ? '0' : $request->couch;
        $item->lady_nasal = $request->lady_nasal  == null ? '0' : $request->lady_nasal;
        $item->respiratory_difficulty = $request->respiratory_difficulty  == null ? '0' : $request->respiratory_difficulty;
        $item->hypotention = $request->hypotention  == null ? '0' : $request->hypotention;
        $item->agusia = $request->agusia  == null ? '0' : $request->agusia;
        $item->anosmia = $request->anosmia  == null ? '0' : $request->anosmia;
        $item->headache = $request->headache  == null ? '0' : $request->headache;
        $item->tachypnea = $request->tachypnea  == null ? '0' : $request->tachypnea;
        $item->hypoxia = $request->hypoxia  == null ? '0' : $request->hypoxia;
        $item->ayanosis = $request->ayanosis == null ? '0' : $request->ayanosis;
        $item->dehydration_food_refused = $request->dehydration_food_refused  == null ? '0' : $request->dehydration_food_refused;
        $item->hemodynamic_commitment = $request->hemodynamic_commitment  == null ? '0' : $request->hemodynamic_commitment;
        $item->consultation_respiratory = $request->consultation_respiratory == null ? '0' : $request->consultation_respiratory;
        $item->base_disease = $request->base_disease  == null ? '0' : $request->base_disease;
        $item->disease = $request->disease  == null ? '' : $request->disease;
        $item->vaccine_first = $request->vaccine_first == null ? date("Y-m-d") : $request->vaccine_first;
        $item->vaccine_second = $request->vaccine_second == null ? date("Y-m-d") : $request->vaccine_second;
        $item->symptom_date = $request->symptom_date == null ? date("Y-m-d") : $request->symptom_date;
        $item->symptom_city = $request->symptom_city == null ? '' : $request->symptom_city;
        $item->symptom_country = $request->symptom_country == null ? '' : $request->symptom_country;
        $item->pregnant = $request->pregnant == null ? '0' : $request->pregnant;
        $item->pregweek = $request->pregweek == null ? '0' : $request->pregweek;
        // echo $item;
        $item->save();

        return response()->json('Successfully Updated');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $item = Report::find($id);
        $item->delete();

        return response()->json('Successfully Deleted');
    }

    public function findbyname($name)
    {
        //
        $item = Report::where('firstname', 'like', "%".$name."%")
            ->orWhere('lastname', 'like', "%".$name."%")
            ->orWhere('dni_number', 'like', "%".$name."%")
            ->orWhere('middlename', 'like', "%".$name."%")
            ->get();
        return response()->json($item);
    }

    public function findbydate($dt)
    {
        //
        $item = Report::where('created_at', 'like', "%".$dt."%")
            ->get();
        return response()->json($item);
    }

    // public function regpdf($id, $pdfname)
    // {
    //     //
    //     $item = Report::find($id);
    //     $item->pdfpath = $pdfname;
    //     $item->save();
    //     $this->sendSMSMessage("Hello, How are you? The SMS message Succeed. I am Dmitriy Abrosimov.", $item->phone);
    //     $this->sendWhatsAppMessage("Hello, How are you? The WhatsApp message Succeed. I am Dmitriy Abrosimov.", $item->phone);
    //     return response()->json(["message"=>"Succeed!"]);
    // }

    public function pdfupload(Request $request, $id)
    {
      //check file

      if ($request->hasFile('image'))
      {
            $file      = $request->file('image');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $pdfname   = date('His').'-'.$filename;
            //move image to public/img folder
            $file->move(public_path('uploads/pdfs'), $pdfname);

            $item = Report::find($id);
            $item->pdfpath = $pdfname;
            $item->save();

            $this->sendSMSMessage("Hello, How are you? Give me your WhatsApp number. I am Dmitriy Abrosimov. Please check.", $item->phone);
            $this->sendWhatsAppMessage("Hello, How are you? The WhatsApp message Succeed. I am Dmitriy Abrosimov.", $item->phone);

            return response()->json(["message" => "success"]);
      }
      else
      {
            return response()->json(["message" => "Select PDF document first."]);
      }

    }

}
