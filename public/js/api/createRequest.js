/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const f = function () {},
          {
            method = 'GET',
            callback = f,
            responseType,
            async = true,
            data = {},
          } = options,
          xhr = new XMLHttpRequest,
          formData = new FormData;
      let {url}  = options,
          items = '';
  
    if (method === 'GET') {
      for (let item in data) {
        items += `${item}=${data[item]}&`;
      }
      url += '?' + items.slice(0, -1);
    } else {
      for (let item in data) {
        formData.append(item, data[item]);
      }
    }
  
    try {
        xhr.open(method, url);
        xhr.responseType = responseType;
        xhr.withCredentials = true;
        xhr.send(formData);
    } catch (err) {
      callback(err);
    }
  
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === xhr.DONE && xhr.status == 200) {
        !xhr.response.success ? callback(xhr.response.error, xhr.response) : callback(null, xhr.response);
      }
    })
  }