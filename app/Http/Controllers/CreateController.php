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


class CreateController extends Controller
{
    //
    public function test()
    {
        return car::all();
    }
    
    
    public function createCar(HttpRequest $request)
    {
//         file_put_contents("C:\Users\andru\OneDrive\Рабочий стол\лабы для пацанов\sergeev\public\storage\text.pem",$request->input('photo'));
        
//  return 0;//json_decode( $request->photo);
        $car = new car();
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
        $file = base64_decode($request->input('photo'));
        Storage::disk('local')->put("photo/$car->id/0.webp",$file);
        }
        
        return response()->json(['id'=> $car->id]);
    }


    public function createFeature(HttpRequest $request)
    {
        $feature = new feature();
        $feature->name = $request->input('name');
        $feature->save();
        return feature::all();
    }

    public function createBase(HttpRequest $request)
    {
        $feature = new base();
        $feature->name = $request->input('name');
        $feature->save();
        return base::all();

        return response()->json("",200);
    }
    
    
}
