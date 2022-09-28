const URL = "https://randomuser.me/api";


const userAvatar = document.getElementById('user-avatar');

const cardTitle = document.getElementById('user-card__title');

const inputUserName = document.getElementById('name');
const inputUserSurname = document.getElementById('surname');
const inputUserBrithDate = document.getElementById('date');
const inputUserLocation = document.getElementById('location');

const randomUserBtn = document.getElementById('random-user');

const loadRandomUser = () => {
  fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    const userData = data.results[0];
    const {
      picture: {
        large,
      },
      name: {
        title,
        first,
        last,
      },
      location: {
        city,
        country,
        street,
      },
      dob: {
        date,
      }
    } = userData;
    const currentTitle = `Welcome ${title} ${first} ${last} !`;
    const currentUserBirthDate = (new Date(date)).toDateString().split(' ');
    const currentUserLocation = `${street.name} ${street.number}, ${city}, ${country}`;

    changeAvatar(userAvatar, large);

    changeTitle(cardTitle, currentTitle);

    changeInputValue(inputUserName, first);
    changeInputValue(inputUserSurname, last);

    changebirthDate(inputUserBrithDate, currentUserBirthDate);

    changeInputValue(inputUserLocation, currentUserLocation);

  });
};

const changeAvatar = (tag, value) => {
  tag.src = value;
};

const changeTitle = (tag, value) => {
  tag.innerHTML = value;
};

const changeInputValue = (input, string) => {
  input.value = string;
};

const changebirthDate = (input, date) => {
  const year = date[3];
  const month = date[1];
  const day = date[2];

  input.value = `${day} ${month} ${year}`;
};

window.onload = loadRandomUser;

randomUserBtn.addEventListener('click', loadRandomUser);
