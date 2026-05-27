package assignment2;

import java.util.Random;

public class Deck {
    public static String[] suitsInOrder = {"clubs", "diamonds", "hearts", "spades"};
    public static Random gen = new Random();

    public int numOfCards; // contains the total number of cards in the deck
    public Card head; // contains a pointer to the card on the top of the deck

    /*
     * TODO: Initializes a Deck object using the inputs provided
     */
    public Deck(int numOfCardsPerSuit, int numOfSuits) {
        /**** ADD CODE HERE ****/
        if (numOfCardsPerSuit<1 || numOfCardsPerSuit>13 || numOfSuits<1 || numOfSuits>4){
            throw new IllegalArgumentException();
        }
        else{
            PlayingCard h =new PlayingCard("C",1);
            this.head=h;
            String type;
            int n;
            for (int i = 0 ; i< numOfSuits; i++){
                if (i==0){
                    type="C";
                }
                else if(i==1){
                    type="D";
                }
                else if (i==2){
                    type="H";
                }
                else {
                    type="S";
                }
                for (int j=1; j<=numOfCardsPerSuit;j++){
                    n=j;
                    PlayingCard temp=new PlayingCard(type, n);
                    this.addCard(temp);
                }
            }
            Joker r =new Joker("red");
            Joker b =new Joker("black");
            this.addCard(r);
            this.addCard(b);
            this.head.next=this.head.next.next;
            this.head.next.next.prev=this.head;
        }
        this.numOfCards=numOfCardsPerSuit*numOfSuits+2;
    }

    /*
     * TODO: Implements a copy constructor for Deck using Card.getCopy().
     * This method runs in O(n), where n is the number of cards in d.
     */
    public Deck(Deck d) {
        /**** ADD CODE HERE ****/
        // Walk the source deck and add a deep copy of each card in order.
        // addCard handles the head == null case, so no pre-initialisation needed.
        Card temp = d.head;
        for (int counter = 0; counter < d.numOfCards; counter++) {
            this.addCard(temp.getCopy());
            temp = temp.next;
        }
        // numOfCards is already correct (incremented by each addCard call).
    }

    /*
     * For testing purposes we need a default constructor.
     */
    public Deck() {}

    /*
     * TODO: Adds the specified card at the bottom of the deck. This
     * method runs in $O(1)$.
     */
    public void addCard(Card c) {
        /**** ADD CODE HERE ****/
        if(c!=null){
            if(this.head == null){
                // First card: make it self-circular
                this.head = c;
                c.next = c;
                c.prev = c;
            } else {
                c.prev = this.head.prev;
                this.head.prev.next = c;
                c.next = this.head;
                this.head.prev = c;
            }
            this.numOfCards=this.numOfCards+1;
        } else{
            throw new NullPointerException();
        }
    }

    /*
     * TODO: Shuffles the deck using the algorithm described in the pdf.
     * This method runs in O(n) and uses O(n) space, where n is the total
     * number of cards in the deck.
     */
    public void shuffle() {
        /**** ADD CODE HERE ****/
        if(this.numOfCards == 0) return;
        Card [] array = new Card[this.numOfCards];
        int i =0;
        Card temp = this.head;
        //initial the array
        while (i<this.numOfCards){
            array[i]=temp;
            temp=temp.next;
            i++;
        }
        for (int j =this.numOfCards-1;j >1 ; j--){
            Card tempcard= array[j];
            //swap A[gen] and A[j]
            array[j]=array[gen.nextInt(j+1)];
            array[gen.nextInt(j+1)]=tempcard;
        }
        // Rebuild the circular doubly-linked list from the shuffled array.
        for (int k = 0; k < this.numOfCards; k++) {
            array[k].next = array[(k + 1) % this.numOfCards];
            array[k].prev = array[(k - 1 + this.numOfCards) % this.numOfCards];
        }
        this.head = array[0];
    }

    /*
     * TODO: Returns a reference to the joker with the specified color in
     * the deck. This method runs in O(n), where n is the total number of
     * cards in the deck.
     */
    public Joker locateJoker(String color) {
        /**** ADD CODE HERE ****/
        if (this.head != null){
            Card temp = this.head;
            for (int counter = 0; counter < this.numOfCards; counter++){
                // Use instanceof so we never mis-identify a PlayingCard as a Joker.
                // Use .equals() for string comparison (== compares references, not content).
                if (temp instanceof Joker && ((Joker) temp).getColor().equals(color)){
                    return (Joker) temp;
                }
                temp = temp.next;
            }
        }
        return null;
    }

    /*
     * TODO: Moved the specified Card, p positions down the deck. You can
     * assume that the input Card does belong to the deck (hence the deck is
     * not empty). This method runs in O(p).
     */
    public void moveCard(Card c, int p) {
        /**** ADD CODE HERE ****/
        // Move card c one position at a time, updating all four pointers each step.
        for (int counter = 0; counter < p; counter++){
            Card before = c.prev;   // node immediately before c
            Card after  = c.next;   // node immediately after  c

            // Splice c out of its current position
            before.next = after;
            after.prev  = before;

            // Insert c right after 'after'
            c.prev          = after;
            c.next          = after.next;
            after.next.prev = c;
            after.next      = c;
        }
    }

    /*
     * TODO: Performs a triple cut on the deck using the two input cards. You
     * can assume that the input cards belong to the deck and the first one is
     * nearest to the top of the deck. This method runs in O(1)
     */
    public void tripleCut(Card firstCard, Card secondCard) {
        /**** ADD CODE HERE ****/
        Card tail = this.head.prev;

        secondCard.prev.next=this.head;
        this.head.prev= secondCard.prev;

        secondCard.next=this.head;
        this.head.next=secondCard;

        tail.next=firstCard;
        firstCard.prev=tail;

        this.head=secondCard;
    }

    /*
     * TODO: Performs a count cut on the deck. Note that if the value of the
     * bottom card is equal to a multiple of the number of cards in the deck,
     * then the method should not do anything. This method runs in O(n).
     */
    public void countCut() {
        /**** ADD CODE HERE ****/
        int value = this.head.prev.getValue();
        Card tail = this.head.prev;
        if (value%this.numOfCards != 0){
            int x =0;
        Card temp = this.head;
        //get the DNode where we do the cut
        while (x < value){
            temp= temp. next;
            x++;
        }

        tail.prev=temp.prev;
        temp.prev.next=tail;

        temp.prev=tail;
        tail.next=temp;

        tail.prev.next=head;
        head.prev=tail.prev;

        this.head=temp;
    }}

    /*
     * TODO: Returns the card that can be found by looking at the value of the
     * card on the top of the deck, and counting down that many cards. If the
     * card found is a Joker, then the method returns null, otherwise it returns
     * the Card found. This method runs in O(n).
     */
    public Card lookUpCard() {
        /**** ADD CODE HERE ****/
        int value = this.head.getValue();
        int i = 0;
        Card temp =this.head;
        while (i < value){
            temp=temp.next;
            i++;
        }
        // Return null if the found card is a Joker; use instanceof, not value comparison.
        if (!(temp instanceof Joker)){
            return temp;
        }
        return null;
    }

    /*
     * TODO: Uses the Solitaire algorithm to generate one value for the keystream
     * using this deck. This method runs in O(n).
     */
    public int generateNextKeystreamValue() {
        /**** ADD CODE HERE ****/
        //red joker move down one
        Joker redj=this.locateJoker("red");
        Joker bj=this.locateJoker("black");
        if (this.head.prev== redj){
            this.moveCard(redj,2);
        }
        else {
            this.moveCard(redj,1);
        }

        //black joker move down two
        if (this.head.prev==bj ){
            this.moveCard(bj,3);
        }
        else {
            this.moveCard(bj,2);
        }
        //triple cuts,check for order of red joker and black joker
        int b = 0;//count for black joker
        int r = 0;
        Card x =this.head;
        int count=0;
        while (count< this.numOfCards){
            if (x instanceof Joker){
                if (x.toString().equals("BJ")){
                    b++;
                    break;
                }else{
                    r++;
                    break;
                }
            }
            x=x.next;
            count++;
        }
        if (b>r){
            this.tripleCut(bj, redj);
        }else{
            this.tripleCut(redj, bj);
        }

        //count cut
        this.countCut();

        //look up the keystream
        if(this.numOfCards !=0){
            Card keyholder = this.lookUpCard();
            if (keyholder != null){
                return keyholder.getValue();
            }
        }
        return 0;
    }


    public abstract class Card {
        public Card next;
        public Card prev;

        public abstract Card getCopy();
        public abstract int getValue();

    }

    public class PlayingCard extends Card {
        public String suit;
        public int rank;

        public PlayingCard(String s, int r) {
            this.suit = s.toLowerCase();
            this.rank = r;
        }

        public String toString() {
            String info = "";
            if (this.rank == 1) {
                //info += "Ace";
                info += "A";
            } else if (this.rank > 10) {
                String[] cards = {"Jack", "Queen", "King"};
                //info += cards[this.rank - 11];
                info += cards[this.rank - 11].charAt(0);
            } else {
                info += this.rank;
            }
            //info += " of " + this.suit;
            info = (info + this.suit.charAt(0)).toUpperCase();
            return info;
        }

        public PlayingCard getCopy() {
            return new PlayingCard(this.suit, this.rank);
        }

        public int getValue() {
            int i;
            for (i = 0; i < suitsInOrder.length; i++) {
                if (this.suit.equals(suitsInOrder[i]))
                    break;
            }

            return this.rank + 13*i;
        }

    }

    public class Joker extends Card{
        public String redOrBlack;

        public Joker(String c) {
            if (!c.equalsIgnoreCase("red") && !c.equalsIgnoreCase("black"))
                throw new IllegalArgumentException("Jokers can only be red or black");

            this.redOrBlack = c.toLowerCase();
        }

        public String toString() {
            //return this.redOrBlack + " Joker";
            return (this.redOrBlack.charAt(0) + "J").toUpperCase();
        }

        public Joker getCopy() {
            return new Joker(this.redOrBlack);
        }

        public int getValue() {
            return numOfCards - 1;
        }

        public String getColor() {
            return this.redOrBlack;
        }
    }

}
