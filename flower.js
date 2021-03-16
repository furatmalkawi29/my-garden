'use strict';



const Flower = function ( name,season,type )
{
  this.name = name;
  this.season = season;
  this.type = type; // category
  this.path;
  Flower.all.push( this );
};

Flower.all = [ ];


//----------------------

let tableHeaderArr = ['Image', 'Name' , 'Season'];

let flowerForm = document.getElementById( 'flowerForm' );
flowerForm.addEventListener( 'submit', handleSubmit );

let flowerTable = document.getElementById( 'flowerTable' );


//------------

function handleSubmit ( event )
{

  event.preventDefault();
  let name = document.getElementById( 'name' ).value;
  let season = document.getElementById( 'season' ).value;
  let type = document.getElementById( 'type' ).value;

  let newFlower = new Flower ( name,season,type );
  let index = Flower.all.length - 1;

  newFlower.addPath();
  renderFlower( index );

  saveToLocalStorage ();
  console.log ( newFlower );
}

//---------------------

function renderFlower ( index )
{
  let trElement = document.createElement( 'tr' );
  flowerTable.appendChild( trElement );

  let tdElement = document.createElement( 'td' );
  trElement.appendChild( tdElement );

  let image = document.createElement( 'img' );
  tdElement.appendChild( image );
  image.src = Flower.all[index].path;

  let td2Element = document.createElement( 'td' );
  trElement.appendChild( td2Element );
  td2Element.textContent = Flower.all[index].name;

  let td3Element = document.createElement( 'td' );
  trElement.appendChild( td3Element );
  td3Element.textContent = Flower.all[index].season;

}

function saveToLocalStorage ()
{
  localStorage.setItem( 'flowers',JSON.stringify( Flower.all ) );
}


//--------------------

function renderHeader ()
{
  let trElement = document.createElement( 'tr' );
  flowerTable.appendChild( trElement );
  for ( let i = 0 ;i<tableHeaderArr.length ; i++ )
  {
    let thElement = document.createElement( 'th' );
    trElement.appendChild( thElement );
    thElement.textContent = tableHeaderArr[i];
  }
}
//---------------------
function renderAll ()
{

  for ( let i = 0 ;i<Flower.all.length ; i++ )
  {
    renderFlower ( i );
  }

}


//---------------------------

Flower.prototype.addPath = function ()
{
  this.path = this.type + '.jpeg';
};
//--------------------------
function getFromLocalStorage ()
{
  let allFlowers = localStorage.getItem( 'flowers' );
  if ( allFlowers )
  {
    let allFlowersObj = JSON.parse( allFlowers );
    Flower.all = allFlowersObj;
    renderAll();
  }
}
//------------
renderHeader ();
getFromLocalStorage();
