var Word;
var Main;
var Button;
var Complete;
var Confuse;
var DontKnow;
class  word {
    constructor() {
        this .idx = -1;
        this .WordList = Array();
        this .AddWordList = Array();
        this .PreWord = null;
        this .Init = false;
    }
    NextWord() {
        this.idx++;
        const sz = this.WordList.length;

        if( sz <= this.idx ) {
            Main .EndCheck = true;
            return ["END", -1];
        }
        this .PreWord = [this .WordList[ this.idx ][ 'en' ], this .WordList[ this.idx ][ 'ch' ], this.idx];
        return this .PreWord;
    }
    WordNotOk(idx) {
        this.AddWordList.push(); 
    }

    ReadWord(data) {
        this .WordList = data;
        this .Init = true;
    }

    EndCheck() {
        return this .WordList .length <= this.idx;
    }
}
class button {
    constructor () {
        this .CompleteEle = document.getElementById("Complete");
        this .ConfuseEle = document.getElementById("Confuse");
        this .DontKnoowEle = document.getElementById("Dontknow");
        this .EventList = Array();

        this .WordTrans = "";
    }

    AddEventListener(button_id) {
        const completeEvent = 
            ()=>{
                if( Main .EndCheck ) {
                    alert("Test End");
                    return;
                }
                if( !Word .Init ) {
                    alert("Please Input The data");
                    return;
                }
                AddWords_to_block( Complete, Word.PreWord );
                
                document.getElementById("complete_cnt").innerHTML = Number(document.getElementById("complete_cnt").innerHTML) + 1;
                Main .Clean();
                this .WordTrans = WordInit();
                if( ! Main .EndCheck )  {
                    WordTrans( this.WordTrans );
                }
            };
        const DontKnowEvent = 
            ()=> {
                if( Main .EndCheck ) {
                    alert("Test End");
                    return;
                }
                if( !Word .Init ) {
                    alert("Please Input The data");
                    return;
                }
                AddWords_to_block( DontKnow, Word.PreWord );

                document.getElementById("Dont_Know_cnt").innerHTML = Number(document.getElementById("Dont_Know_cnt").innerHTML) + 1;
                Main .Clean();
                this .WordTrans = WordInit();
                if( Main .EndCheck ) {
                    alert("Test End");
                    return;
                }
                if( ! Main .EndCheck ) 
                    WordTrans( this.WordTrans );
            };
        const ConfuseEvent = 
            ()=>{
                if( Main .EndCheck ) {
                    alert("Test End");
                    return;
                }
                if( !Word .Init ) {
                    alert("Please Input The data");
                    return;
                }
                AddWords_to_block( Confuse, Word.PreWord );
                document.getElementById("confuse_cnt").innerHTML = Number(document.getElementById("confuse_cnt").innerHTML) + 1;
                Main .Clean();
                this .WordTrans = WordInit();
                if( ! Main .EndCheck ) 
                    WordTrans( this.WordTrans );
            }


        this .CompleteEle .addEventListener(
            'click',
            completeEvent
        );
        this .DontKnoowEle .addEventListener(
            'click',
            DontKnowEvent
        );
        this .ConfuseEle .addEventListener(
            'click',
            ConfuseEvent
        );
        document .addEventListener(
            'keydown',
            (event)=>{
                if( event .code == "Digit1") {
                    completeEvent();
                }
                if( event .code == "Digit2") {
                    ConfuseEvent();
                }
                if( event .code == "Digit3") {
                    DontKnowEvent();
                }
            }
        );
    }
}

class main {
    constructor( Main_id) {
        this.getelement( Main_id );
        this. EncCheck = 0;
    }
    AddElement(tag='p',  innerHtml = "",id="",class_ = "", style="") {
        const data = 
        `<${tag} class="${class_}" id="${id}" style="${style}">${innerHtml}</${tag}>`
        ;

        this .ele .innerHTML += data;
    }

    Clean() {
        this .ele .innerHTML = "";
    }
    getelement(id) {
        this.ele = document.getElementById( id )
    }
}
function WordInit() {
    if( !Word.Init ) {
        alert( "Please input the file");
        return;
    }
    const Wd = Word.NextWord();
    Main.AddElement('p', Wd[0], `Word`);
    return Wd;
}
function WordTrans(Wd) { // Word information
    Main .AddElement('p', Wd[1], `Translate`, "hidden");
}

function AddWords_to_block(Obj, Wd) {
    //console.log(Wd);
    Obj .AddElement('p', Wd[0], `${Wd[2]}thWord`);
    Obj .AddElement('p', Wd[1], `${Wd[2]}thWord Translate`, ``, `border-bottom: 5px solid green;` );
}

function Make_A_Json_File_Dowload(Data) {
    const blob = new Blob([JSON.stringify(Data)], {type: 'text/json'});
    const url = URL.createObjectURL(blob);
    const downloadlink = document.createElement('a');
    downloadlink .href = url;
    downloadlink .download = 'data.json';
    downloadlink .innerText = Data;
    document.body.appendChild(downloadlink);
    console.log(downloadlink);
    return downloadlink;
}


function init() {
    Word = new word();
    Main = new main("word_output");
    Complete = new main("complete");
    Confuse = new main("confuse");
    DontKnow = new main("Dont_Know");
    Button = new button();
    Button.AddEventListener();

    const FileEle = document.getElementById( 'FileInput' );
    FileEle .addEventListener( 'change', (event)=>{
        const file = event .target .files[0];
        const reader  = new FileReader();
        reader .onload = (event) => {
            //console.log( JSON .parse( event.target.result))
            Main.Clean();
            Word .ReadWord( JSON.parse( event .target .result ));
            WordTrans( WordInit() );
        };
        reader .readAsText(file);
    });
}