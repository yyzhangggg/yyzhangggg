package assignment2;

import java.util.Locale;

public class SolitaireCipher {
    public Deck key;

    public SolitaireCipher (Deck key) {

        this.key = new Deck(key); // deep copy of the deck
    }

    /*
     * TODO: Generates a keystream of the given size
     */
    public int[] getKeystream(int size) {
        /**** ADD CODE HERE ****/
        if(size !=0){
            int [] result = new int [size];
            int i =0;
            while(i<size){
                int value = this.key.generateNextKeystreamValue();
                        result[i]=value;
                i++;
            }
            return result;
        }
        return null;
    }

    /*
     * TODO: Encodes the input message using the algorithm described in the pdf.
     */
    public String encode(String msg) {
        /**** ADD CODE HERE ****/
        if (msg != null){
            msg=msg.replaceAll("\\p{Punct}","");
            msg=msg.replaceAll(" ","");
            msg=msg.toUpperCase();
            int size = msg.length();
            int [] key = getKeystream(size);
            char []data =new char[size];
            for (int i =0;i<size; i++){
                int initial= (int)msg.charAt(i);
                char newcharacter=0;
                if (initial + key[i]>90){
                    newcharacter = (char) (65+(initial+key[i]-90));
                }
                else{
                    newcharacter = (char) (initial + key[i]);
                }
                data[i]=newcharacter;
            }
            String result = new String(data);
            return result;
        }
        return null;

    }

    /*
     * TODO: Decodes the input message using the algorithm described in the pdf.
     */
    public String decode(String msg) {
        /**** ADD CODE HERE ****/
        int size=msg.length();
        if(size!=0){
            int [] key = getKeystream(size);
            String result = "";
            for (int i=0; i<size;i++){
                char newcharacter=0;
            int initial = (int) msg.charAt(i);
            if (initial -key[i]<65){
                newcharacter =(char) (90-(65-(initial-key[i])));
            }
            else{
                newcharacter =(char) (initial-key[i]);
            }
            result=result+newcharacter;
        }
        return result;}
        return null;
    }

}
