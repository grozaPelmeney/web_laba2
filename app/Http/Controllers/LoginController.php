<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\CityModel;
use Illuminate\Support\Facades\Mail;
use App\Mail\testMailClass;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Validator;
use Laravel\Passport\Bridge\AccessToken;
use App\Http\Controllers\mailController;
use App\Http\Controllers\userController;
use Illuminate\Support\Facades\Hash;





class LoginController extends Controller
{
    

    public function registr(Request $request)
    {
       //return Hash::make($request->input('password'));
    
        $validator = Validator::make($request->all(), [
            'name' => 'required|between:2,100',
            'email' => 'required|email|unique:users|max:50',
            'password' => 'required|string|min:6',
        ]);



        $array = json_decode(json_encode($validator->getMessageBag()), true);
        foreach( array_keys($array) as $fail)
        {
            if($fail == 'name')
            {
                return response()->json([
                    'message' => 'name error'
                ], 401);
            }
            if($fail == 'email')
            {
                return response()->json([
                    'message' => 'email error'
                ], 402);
            }
            if($fail == 'password')
            {
                return response()->json([
                    'message' => 'password error'
                ], 403);
            }
        }
        
        
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error'
            ], 400);
        }



/////////////////////////////////////////bcrypt////////////////////
         
        $user = User::create(array_merge([
            'name'=>$request->input('name'),
            'password' => Hash::make($request->input('password')),
            'email'=>$request->input('email'),
            ]
    ));
    //$user ->email_verified_at =  now();
    $user->save();


    return response()->json([
        'message' => 'Successfully registered',
        'user' => $user
    ], 200);

}


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error'
            ], 400);
        }

     
        $user = User::where('email',$request->input('email'))->first();

        if($user && Hash::check($request->input('password'), $user->password)) {
            return response()->json($user);
        }
       
        return response()->json('',400);


    }
    
    
    // public function profile()
    // {
    //     //if(auth('api')->user() != null){    
    //     return (new userController())->userInfo(auth('api')->user());
    //     //}
    //     // else
    //     // {
    //     //     return response()->json([
    //     //         'message' => 'Unauthorized'
    //     //     ], 401);
    //     // }
    // }

    
    // public function refresh(Request $request)
    // {
    //     $response = Http::asForm()->post('https://polar-eyrie-91847.herokuapp.com/oauth/token', [
    //         'grant_type' => 'refresh_token',
    //         'refresh_token' => $request->get('refresh_token'),
    //         'client_id' => '2',
    //         'client_secret' => 'fgRE04VilkM77asl4298NO9mFusbbWHyCAHi0kBb',
    //         'scope' => '',
    //     ]);

    //     return $response->json();
    // }


    

    
}