import {
    downloadImg
} from "./api";
import './addImg.css'
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';


const refs = {
    formInput: document.querySelector('#search-form'),
    loadButton: document.querySelector('.myButton'),
    cardsList: document.querySelector('.gallery'),
}

let pageNum = 1;

refs.formInput.addEventListener('submit', showImages)

refs.loadButton.addEventListener('click', myScroll);
refs.cardsList.addEventListener('click', myModal);

function myModal(e) {
    console.log(e);
    if (e.target.nodeName === 'IMG') {
        const instance = basicLightbox.create(`
            <div class="modal">
                <img src="${e.toElement.currentSrc}" width="800" height="600">
            </div>`);

        instance.show();
    }
    console.log(e.toElement.currentSrc);
}
let prevQuery = "";

function showImages(e) {
    e.preventDefault();
    let query = refs.formInput.querySelector('input');

    if (query.value !== prevQuery) {
        refs.cardsList.innerHTML = '';
        pageNum = 1;
    }

    downloadImg(query.value, pageNum)
        .then(data => {
            getMessage(data);
            pageNum+=1;
            refs.cardsList.insertAdjacentHTML('beforeend', createList(data));
        })
    prevQuery = query.value;
    console.log('kek');
}

function createList(data) {
    console.log(data);
    let res = data.hits.reduce((acc, item) => {
        return acc + `<li class=gallery-item><div class="photo-card">
      <img src="${item.webformatURL}" alt="${item.tags}" width= "350px" height = "250px"/>
    
      <div class="stats">
        <p class="stats-item">
          <i class="material-icons">thumb_up</i>${item.favorites}
        </p>
        <p class="stats-item">
          <i class="material-icons">visibility</i>${item.views}
        </p>
        <p class="stats-item"><i class="material-icons">comment</i>
          ${item.comments}
        </p>
        <p class="stats-item"><i class="material-icons">cloud_download</i>
         ${item.downloads}
        </p>
      </div>
    </div></li>`;
    }, '');

    return res;

}

function getMessage(data) {
    // if (data.hits.length ===12) {
    //     let notice = PNotify.success({
    //         title: 'Success!',
    //         text: `${data.hits.length} images were successfully loaded `,
    //         modules: {
    //             Buttons: {
    //                 closer: false,
    //                 sticker: false
    //             }
    //         }
    //     });

    //     notice.on('click', function () {
    //         notice.close();
    //     });
    // };
     if (data.hits.length===0)
        {let noticeErr = PNotify.error({
            title: 'I have nothing for you',
            text: `Try once more time. And I will be trying better for you `,
            modules: {
                Buttons: {
                    closer: false,
                    sticker: false
                }
            }
        });

        noticeErr.on('click', function () {
            noticeErr.close();
        });
    }
}

function addImage() {
    PNotify.closeAll();
    pageNum++;
}

function myScroll() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', scrol);


function scrol(event) {
    if (document.documentElement.getBoundingClientRect().bottom < document.documentElement.clientHeight + 100) {
        showImages(event);
        console.log("info");
    } else {
        return;
    }
}