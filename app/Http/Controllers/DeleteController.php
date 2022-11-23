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


class DeleteController extends Controller
{
    //

    
    public function deleteCar(HttpRequest $request)
    {
   
        $car = car::where('id',$request->input('id_car'))->first();
        
        $car->delete();

        // Get all files in a directory
        $files = Storage::allFiles("photo/$car->id");
        Storage::deleteDirectory("photo/$car->id");
        // Delete Files
        Storage::delete($files);
        return car::all();
    }


    public function deleteFeature(HttpRequest $request)
    {
        $feature = feature::where('id',$request->input('id_feature'))->first();
        $feature->delete();
        return feature::all();
    }
    
}
