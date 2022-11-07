class Words{
    constructor(){
        this.words = {
            "apple": "1",
            "sun": "2",
            "moon": "3"
        };
        this .perscore = 10;
    };

    CaculateScore(answer) {
        console.log("Start Caculate Score");
        let FinalScore = 0;
        let idx = 0;
        console.log(answer)
        console.log(answer.length)
        for( const [key, value] of Object.entries(this.words)) {
            if( value == answer[idx]) FinalScore += this.perscore;
            idx++;
        }
        console.log(`Final Score is ${FinalScore}`)
        return FinalScore
    }
};
function display_visible_change(ele) {
    ele .style.display = ele .style.display === "none" ? "" : "none";
}
function EndButtonInit(NewWord) {
    let endbtn = document.getElementById("End");
    endbtn .addEventListener( "click", end_test.bind(null, NewWord) );
}

function ReadOnlyChnage(status) {
    let WordTableInput = document.querySelectorAll("input.ans")
    // console.log(WordTableInput.length)
    for( let i = 0; i < WordTableInput.length; ++i) {
        WordTableInput[i] .readOnly = status 
    }
}

function GetInput() {
    let WordTableInput = document.querySelectorAll("input.ans")
    
    let WordList = []
    for( let i = 0; i < WordTableInput.length; ++i) {
        // console.log(WordTableInput[i])
        WordList .push( WordTableInput[i].value )
    }
    // for( let i = 0; i < WordList.length; ++i) 
    //     console.log(WordList[i])
    return WordList
}
function set_score (score) {
    document.getElementById("Final Score").innerText = score;
}

function end_test (NewWord) {
    console.log("Test End");
    ReadOnlyChnage(true);
    let answer = GetInput();
    let score = NewWord.CaculateScore(answer);
    set_score(score);

    let btn = document.getElementById("Start");
    btn.innerHTML = "Start";
}

function make_test(newWord) {
    console.log("Making test now")

    let words = newWord.words;
    let WordTable = document.getElementById("words");
    WordTable.innerHTML = "" 


    let cnt = 0;
    for( const [key, value] of Object.entries(words)) {
        cnt++;
        WordTable.innerHTML += 
        `
        <tr id = "${cnt}">
            <td>
                <span id="${cnt}" class="counter">${cnt}</span>
            </td>
            <td> 
                <span>${key}</span>
            </td>
            <td>
                <input id="${cnt}" class="ans"></input>
            </td>
        </tr>
        `
    
    }
    let btn = document.getElementById("Start")
    btn.innerHTML = "Restart"
    display_visible_change(document.getElementById("End"));
    EndButtonInit(newWord);
}

function init() {
    let btn = document.getElementById("Start")
    var newWord = new Words();
    btn.addEventListener("click", make_test.bind(null, newWord));
    // make_test(newWord)
}