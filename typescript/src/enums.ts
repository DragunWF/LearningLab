enum Mood {
  Happy = "small",
  Angry = "angry",
  Sad = "sad",
}

/* 
    Constant values in enums are numbers by default 
    when not initialized.
*/
enum BurgerSize {
  Large,
  Medium,
  Small,
}

function enumMain() {
  const mood: Mood = Mood.Happy;
  const burgerSize: BurgerSize = BurgerSize.Medium;
  console.log(mood);
  console.log(Mood.Angry);
  console.log(Mood.Sad);
  console.log(BurgerSize.Large);
  console.log(burgerSize);
  console.log(BurgerSize.Small);
}

enumMain();
