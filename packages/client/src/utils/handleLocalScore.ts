const putToLocalStorage = (date: string, score: number) => {
    localStorage.setItem('highScore', JSON.stringify({ date, score }))
}

const getDate = () => {
  const today = new Date();
  return today.toLocaleString('de-DE', { year: '2-digit', month: '2-digit', day: '2-digit'});
}

export const checkDayScore = () => {
  const date = getDate();
  
  if (!localStorage.highScore) {
    putToLocalStorage(date, 0);
    return 0;
  }
  
  const {date: localDate, score: localScore} = JSON.parse(localStorage.highScore);
  
  return localDate === date ? Number(localScore) : 0;
}

export const handleDayScore = (score: number) => {
  const date = getDate();
  
  if (!localStorage.highScore) {
    putToLocalStorage(date, score);
    return score;
  }
  
  const {date: localDate, score: localScore} = JSON.parse(localStorage.highScore);
  
  if (localDate !== date || score > Number(localScore)) {
    putToLocalStorage(date, score)
    return score;
  }
  
  return Number(localScore);
}
