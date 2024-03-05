export class GenreForm
{
      
      
        genre_nm : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param GenreForm
     */
    constructor(GenreForm)
    {
        console.log(GenreForm)
        {
              
                this.genre_nm  = GenreForm.genre_nm || '';  
                this.crte_usr_id  = GenreForm.crte_usr_id || '';  
                this.updte_usr_id  = GenreForm.updte_usr_id || '';
        }
    }
}