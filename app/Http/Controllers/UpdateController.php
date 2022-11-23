<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\Request;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Request as FacadesRequest;
use App\Helpers\ResponseBuilder;
use App\Models\car;
use App\Models\feature;
use App\Models\base;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;


class UpdateController extends Controller
{
    //
    public function test()
    {
        return car::all();
    }
    
    
    public function updateCar(HttpRequest $request)
    {
        




        $car = car::where('id',$request->input('id_car'))->first();
        
        
        $car->name = $request->input('name');
        $car->engine_volume = $request->input('engine_volume');
        $car->power = $request->input('power');
        $car->torque = $request->input('torque');
        $car->fuel = $request->input('fuel');
        $car->tires = $request->input('tires');
        $car->weight = $request->input('weight');
        $car->fuel_tank_volume = $request->input('fuel_tank_volume');
        $car->sizes = $request->input('sizes');
        $car->id_feature = $request->input('id_feature');
        $car->id_base = $request->input('id_base');
        $car->description = $request->input('description');

        $car->save();


        if( $request->has('photo'))
        {
            $files = Storage::allFiles("photo/$car->id");
            // Delete Files
            Storage::delete($files);

            $file = base64_decode($request->input('photo'));
            Storage::disk('local')->put("photo/$car->id/0.webp",$file);
        }
       
        
        return car::all();
    }


    public function updateFeature(HttpRequest $request)
    {
        $feature = feature::where('id',$request->input('id_feature'))->first();
        $feature->name = $request->input('name');
        $feature->save();
        return feature::all();
    }
    
}
