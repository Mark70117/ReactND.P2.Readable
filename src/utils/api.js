const api = 'http://192.168.0.201:5001'; // FIX  -- need to get from env

const headers = {
  Accept: 'application/json',
  Authorization: '1018', // My birthday
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers }).then(res => res.json()).then(data => {
    console.log(
      'getCategories data:' + JSON.stringify(data.categories, null, 4)
    );
    return { categories: data.categories };
  });
