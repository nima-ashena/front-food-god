export interface IAddRestaurantAdmin {
   email: string;
   password: string;
   phone: string;
   name: string;
}

export interface IVocab {
   _id: string;
   title: string;
   phonetics?: string;
   audio?: string | any;
   audioFile?: File;
   type?: string;
   definition?: string;
   example?: string;
   is_disable?: Boolean;
   true_guess_count?: Number;
   completed?: Boolean;
}
