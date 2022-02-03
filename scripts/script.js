'use strict';

const logo = document.querySelector('.logo');
const navigation = document.querySelector('.navigation');
const toggle = document.querySelector('.toggle');

const activeMenu = function () {
  navigation.style.width = '250px';
  logo.classList.add('logoDisplay');
  logo.classList.remove('logoHide');
  if (window.innerWidth <= 767) {
    toggle.style.display = 'flex';
    navigation.style.width = '100%';
  }
};

const inactiveMenu = function () {
  navigation.style.width = '60px';
  logo.classList.remove('logoDisplay');
  logo.classList.add('logoHide');
  if (window.innerWidth <= 767) {
    toggle.style.display = 'none';
  }
};

const untoggleNavigation = function () {
  navigation.style.width = '60px';
};

navigation.addEventListener('mouseover', activeMenu);
navigation.addEventListener('mouseleave', inactiveMenu);
toggle.addEventListener('click', untoggleNavigation);
