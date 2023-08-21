// Сохраняем в куки на 1час
export function setCookie(name: string, value: string):void {
  var expires = "";
  var date = new Date();
  date.setTime(date.getTime() + (60 * 60 * 1000));
  expires = "; expires=" + date.toUTCString();
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

// Получаем из куки
export function getCookie(request:Request, name: string):string {
  var nameEQ = name + "=";
  var ca = request.headers['cookie'].split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
