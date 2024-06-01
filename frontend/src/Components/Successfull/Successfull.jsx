import React, {useState} from 'react'
import './Successfull.css'
import { Link } from 'react-router-dom'


const Successfull = () => {
    const email = localStorage.getItem('email');
    const handleCopyClick = () => {
        navigator.clipboard.writeText(email)
            .then(() => {
                alert("Email copied to clipboard!");
            })
            .catch(err => {
                console.error("Could not copy text: ", err);
            });
    };
    const handleChatClick = () => {
        window.open("https://alvo.chat/4w7b", "_blank");
    };
    return (
        <div class='content'>
            <div class='fa fa-check-circle-o symbol'></div>
            <div class='title'></div>
            <div class="wrapper"> <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            </div>
            <p>Success create order!</p>
            <svg width="287" height="278" viewBox="0 0 287 278" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="thank-you" d="M65.368 22.16C66.36 22.352 67.096 22.688 67.576 23.168C68.088 23.648 68.344 24.208 68.344 24.848C68.344 25.904 68.04 26.672 67.432 27.152C66.856 27.632 65.928 27.824 64.648 27.728C61.768 27.504 59.512 27.36 57.88 27.296C56.28 27.2 54.168 27.136 51.544 27.104C50.36 32.992 49.272 38.912 48.28 44.864C47.928 47.04 47.56 49.568 47.176 52.448C46.792 55.296 46.536 57.6 46.408 59.36C46.344 60.288 45.96 61.008 45.256 61.52C44.552 62 43.704 62.24 42.712 62.24C41.656 62.24 40.84 61.984 40.264 61.472C39.688 60.96 39.4 60.288 39.4 59.456C39.4 58.688 39.512 57.424 39.736 55.664C39.992 53.872 40.28 52 40.6 50.048C40.952 48.096 41.224 46.4 41.416 44.96C41.768 42.528 42.168 40.112 42.616 37.712C43.064 35.312 43.512 33.04 43.96 30.896C44.056 30.416 44.168 29.872 44.296 29.264C44.424 28.624 44.568 27.92 44.728 27.152C41.592 27.248 39.128 27.504 37.336 27.92C35.544 28.336 34.264 28.928 33.496 29.696C32.76 30.432 32.392 31.392 32.392 32.576C32.392 33.664 32.712 34.704 33.352 35.696C33.48 35.92 33.544 36.16 33.544 36.416C33.544 37.024 33.176 37.6 32.44 38.144C31.736 38.656 31 38.912 30.232 38.912C29.688 38.912 29.24 38.752 28.888 38.432C28.248 37.888 27.72 37.12 27.304 36.128C26.888 35.104 26.68 33.952 26.68 32.672C26.68 29.952 27.56 27.776 29.32 26.144C31.112 24.48 33.816 23.264 37.432 22.496C41.08 21.728 45.752 21.344 51.448 21.344C54.968 21.344 57.768 21.408 59.848 21.536C61.96 21.664 63.8 21.872 65.368 22.16ZM87.4128 51.296C87.8288 51.296 88.1488 51.488 88.3728 51.872C88.6288 52.256 88.7568 52.784 88.7568 53.456C88.7568 54.736 88.4528 55.728 87.8448 56.432C86.3728 58.128 84.8528 59.52 83.2848 60.608C81.7488 61.696 79.9888 62.24 78.0048 62.24C76.3728 62.24 75.1408 61.776 74.3088 60.848C73.4768 59.888 73.0608 58.512 73.0608 56.72C73.0608 55.824 73.2848 54.224 73.7328 51.92C74.1488 49.904 74.3568 48.512 74.3568 47.744C74.3568 47.232 74.1808 46.976 73.8288 46.976C73.4128 46.976 72.8208 47.52 72.0528 48.608C71.2848 49.664 70.5168 51.072 69.7488 52.832C68.9808 54.592 68.3568 56.448 67.8768 58.4C67.2688 60.96 65.7648 62.24 63.3648 62.24C62.4048 62.24 61.7648 61.904 61.4448 61.232C61.1568 60.528 61.0128 59.28 61.0128 57.488C61.0128 56.464 61.0288 55.648 61.0608 55.04L61.1088 51.2C61.1088 46.272 61.6048 41.136 62.5968 35.792C63.6208 30.448 65.1088 25.968 67.0608 22.352C69.0448 18.704 71.4128 16.88 74.1648 16.88C75.6368 16.88 76.8208 17.52 77.7168 18.8C78.6448 20.048 79.1088 21.68 79.1088 23.696C79.1088 26.928 78.1648 30.288 76.2768 33.776C74.3888 37.232 71.3168 41.28 67.0608 45.92C66.9648 47.584 66.9168 49.296 66.9168 51.056C67.9728 48.336 69.1408 46.128 70.4208 44.432C71.7328 42.704 73.0128 41.472 74.2608 40.736C75.5408 40 76.7088 39.632 77.7648 39.632C79.8448 39.632 80.8848 40.672 80.8848 42.752C80.8848 44 80.5328 46.256 79.8288 49.52C79.2208 52.304 78.9168 54.144 78.9168 55.04C78.9168 56.32 79.3808 56.96 80.3088 56.96C80.9488 56.96 81.7008 56.576 82.5648 55.808C83.4608 55.008 84.6448 53.728 86.1168 51.968C86.5008 51.52 86.9328 51.296 87.4128 51.296ZM73.1568 21.632C72.5808 21.632 71.9408 22.464 71.2368 24.128C70.5328 25.76 69.8448 27.984 69.1728 30.8C68.5328 33.584 68.0048 36.624 67.5888 39.92C69.5728 37.584 71.2048 35.04 72.4848 32.288C73.7968 29.536 74.4528 27.04 74.4528 24.8C74.4528 23.776 74.3408 22.992 74.1168 22.448C73.8928 21.904 73.5728 21.632 73.1568 21.632ZM90.7705 62.24C88.7865 62.24 87.2025 61.52 86.0185 60.08C84.8345 58.64 84.2425 56.752 84.2425 54.416C84.2425 51.856 84.8345 49.44 86.0185 47.168C87.2025 44.864 88.7705 43.024 90.7225 41.648C92.7065 40.24 94.8025 39.536 97.0105 39.536C97.7145 39.536 98.1785 39.68 98.4025 39.968C98.6585 40.224 98.8665 40.704 99.0265 41.408C99.6985 41.28 100.403 41.216 101.139 41.216C102.707 41.216 103.491 41.776 103.491 42.896C103.491 43.568 103.251 45.168 102.771 47.696C102.035 51.376 101.667 53.936 101.667 55.376C101.667 55.856 101.779 56.24 102.003 56.528C102.259 56.816 102.579 56.96 102.963 56.96C103.571 56.96 104.307 56.576 105.171 55.808C106.035 55.008 107.203 53.728 108.675 51.968C109.059 51.52 109.491 51.296 109.971 51.296C110.387 51.296 110.707 51.488 110.931 51.872C111.187 52.256 111.315 52.784 111.315 53.456C111.315 54.736 111.011 55.728 110.403 56.432C109.091 58.064 107.699 59.44 106.227 60.56C104.755 61.68 103.331 62.24 101.955 62.24C100.899 62.24 99.9225 61.888 99.0265 61.184C98.1625 60.448 97.5065 59.456 97.0585 58.208C95.3945 60.896 93.2985 62.24 90.7705 62.24ZM92.4985 57.392C93.2025 57.392 93.8745 56.976 94.5145 56.144C95.1545 55.312 95.6185 54.208 95.9065 52.832L97.6825 44C96.3385 44.032 95.0905 44.544 93.9385 45.536C92.8185 46.496 91.9225 47.776 91.2505 49.376C90.5785 50.976 90.2425 52.672 90.2425 54.464C90.2425 55.456 90.4345 56.192 90.8185 56.672C91.2345 57.152 91.7945 57.392 92.4985 57.392ZM110.821 62.24C109.605 62.24 108.741 61.6 108.229 60.32C107.749 59.04 107.509 56.992 107.509 54.176C107.509 50.016 108.101 46.064 109.285 42.32C109.573 41.392 110.037 40.72 110.677 40.304C111.349 39.856 112.277 39.632 113.461 39.632C114.101 39.632 114.549 39.712 114.805 39.872C115.061 40.032 115.189 40.336 115.189 40.784C115.189 41.296 114.949 42.448 114.469 44.24C114.149 45.52 113.893 46.64 113.701 47.6C113.509 48.56 113.349 49.744 113.221 51.152C114.277 48.4 115.461 46.16 116.773 44.432C118.085 42.704 119.365 41.472 120.613 40.736C121.893 40 123.061 39.632 124.117 39.632C126.197 39.632 127.237 40.672 127.237 42.752C127.237 44 126.885 46.256 126.181 49.52C125.573 52.304 125.269 54.144 125.269 55.04C125.269 56.32 125.733 56.96 126.661 56.96C127.301 56.96 128.053 56.576 128.917 55.808C129.813 55.008 130.997 53.728 132.469 51.968C132.853 51.52 133.285 51.296 133.765 51.296C134.181 51.296 134.501 51.488 134.725 51.872C134.981 52.256 135.109 52.784 135.109 53.456C135.109 54.736 134.805 55.728 134.197 56.432C132.821 58.128 131.333 59.52 129.733 60.608C128.165 61.696 126.373 62.24 124.357 62.24C122.725 62.24 121.493 61.776 120.661 60.848C119.829 59.888 119.413 58.512 119.413 56.72C119.413 55.824 119.637 54.224 120.085 51.92C120.501 49.904 120.709 48.512 120.709 47.744C120.709 47.232 120.533 46.976 120.181 46.976C119.765 46.976 119.173 47.52 118.405 48.608C117.669 49.664 116.901 51.072 116.101 52.832C115.333 54.592 114.709 56.448 114.229 58.4C113.877 59.904 113.461 60.928 112.981 61.472C112.533 61.984 111.813 62.24 110.821 62.24ZM151.626 57.008C152.938 57.264 153.594 57.984 153.594 59.168C153.594 59.968 153.226 60.688 152.49 61.328C151.786 61.936 150.762 62.24 149.418 62.24C147.114 62.24 145.226 61.536 143.754 60.128C142.314 58.688 141.594 56.816 141.594 54.512C141.594 53.264 142.234 52.368 143.514 51.824C144.922 51.216 145.93 50.576 146.538 49.904C147.146 49.2 147.45 48.352 147.45 47.36C147.45 46.784 147.322 46.352 147.066 46.064C146.842 45.776 146.554 45.632 146.202 45.632C145.338 45.632 144.378 46.256 143.322 47.504C142.298 48.752 141.338 50.368 140.442 52.352C139.546 54.304 138.842 56.32 138.33 58.4C137.978 59.904 137.562 60.928 137.082 61.472C136.634 61.984 135.914 62.24 134.922 62.24C133.93 62.24 133.194 61.888 132.714 61.184C132.266 60.448 131.962 59.328 131.802 57.824C131.642 56.32 131.562 54.112 131.562 51.2C131.562 46.272 132.058 41.136 133.05 35.792C134.074 30.448 135.562 25.968 137.514 22.352C139.498 18.704 141.866 16.88 144.618 16.88C146.09 16.88 147.274 17.52 148.17 18.8C149.098 20.048 149.562 21.68 149.562 23.696C149.562 26.928 148.618 30.288 146.73 33.776C144.842 37.232 141.77 41.28 137.514 45.92C137.418 47.584 137.37 49.296 137.37 51.056C138.906 47.056 140.666 44.16 142.65 42.368C144.634 40.544 146.49 39.632 148.218 39.632C149.818 39.632 151.098 40.176 152.058 41.264C153.05 42.352 153.546 43.696 153.546 45.296C153.546 47.056 153.098 48.672 152.202 50.144C151.306 51.616 149.77 52.928 147.594 54.08C147.786 55.04 148.17 55.712 148.746 56.096C149.354 56.448 150.314 56.752 151.626 57.008ZM143.61 21.632C143.034 21.632 142.394 22.464 141.69 24.128C140.986 25.76 140.298 27.984 139.626 30.8C138.986 33.584 138.458 36.624 138.042 39.92C140.026 37.584 141.658 35.04 142.938 32.288C144.25 29.536 144.906 27.04 144.906 24.8C144.906 23.776 144.794 22.992 144.57 22.448C144.346 21.904 144.026 21.632 143.61 21.632ZM210.24 51.248C210.432 51.184 210.72 51.152 211.104 51.152C212.192 51.152 212.736 51.856 212.736 53.264C212.736 54.032 212.56 54.688 212.208 55.232C211.888 55.744 211.376 56.064 210.672 56.192C207.76 56.736 204.896 57.344 202.08 58.016L201.936 59.168C201.04 65.472 199.248 70.128 196.56 73.136C193.904 76.176 190.576 77.696 186.576 77.696C183.92 77.696 181.856 77.04 180.384 75.728C178.944 74.448 178.224 72.8 178.224 70.784C178.224 67.424 179.728 64.432 182.736 61.808C185.744 59.184 190.304 56.864 196.416 54.848L197.376 48.08C197.504 47.312 197.664 46.288 197.856 45.008C196.352 48.976 194.432 51.936 192.096 53.888C189.76 55.84 187.152 56.816 184.272 56.816C181.52 56.816 179.424 55.984 177.984 54.32C176.544 52.624 175.824 50.448 175.824 47.792C175.824 46.608 175.952 45.312 176.208 43.904C176.464 42.464 176.864 40.528 177.408 38.096C177.888 35.888 178.24 34.128 178.464 32.816C178.72 31.504 178.848 30.336 178.848 29.312C178.848 27.776 178.256 27.008 177.072 27.008C176.144 27.008 175.04 27.472 173.76 28.4C172.512 29.296 171.184 30.688 169.776 32.576C169.328 33.184 168.832 33.488 168.288 33.488C167.84 33.488 167.44 33.28 167.088 32.864C166.768 32.416 166.608 31.92 166.608 31.376C166.608 30.384 167.056 29.264 167.952 28.016C171.216 23.536 175.04 21.296 179.424 21.296C181.376 21.296 182.896 21.888 183.984 23.072C185.104 24.256 185.664 26 185.664 28.304C185.664 29.968 185.504 31.68 185.184 33.44C184.896 35.168 184.448 37.376 183.84 40.064C183.456 41.664 183.168 42.96 182.976 43.952C182.784 44.912 182.688 45.712 182.688 46.352C182.688 47.984 182.976 49.152 183.552 49.856C184.128 50.56 185.136 50.912 186.576 50.912C188.304 50.912 190.064 49.968 191.856 48.08C193.68 46.16 195.312 43.264 196.752 39.392C198.224 35.52 199.28 30.784 199.92 25.184C200.08 23.776 200.448 22.784 201.024 22.208C201.6 21.6 202.432 21.296 203.52 21.296C205.76 21.296 206.88 22.416 206.88 24.656C206.88 25.04 206.864 25.344 206.832 25.568C206.16 30.336 205.536 34.64 204.96 38.48C204.64 40.784 204.288 43.152 203.904 45.584C203.552 48.016 203.2 50.48 202.848 52.976C205.184 52.336 207.648 51.76 210.24 51.248ZM195.696 59.888C187.952 62.576 184.08 65.84 184.08 69.68C184.08 70.576 184.352 71.312 184.896 71.888C185.472 72.496 186.272 72.8 187.296 72.8C191.744 72.8 194.528 68.608 195.648 60.224L195.696 59.888ZM234.268 47.264C234.684 47.264 235.004 47.472 235.228 47.888C235.452 48.304 235.564 48.832 235.564 49.472C235.564 51.008 235.1 51.92 234.172 52.208C232.252 52.88 230.14 53.264 227.836 53.36C227.228 56.048 226.028 58.208 224.236 59.84C222.444 61.44 220.412 62.24 218.14 62.24C216.22 62.24 214.572 61.776 213.196 60.848C211.852 59.92 210.828 58.688 210.124 57.152C209.42 55.616 209.068 53.952 209.068 52.16C209.068 49.728 209.532 47.568 210.46 45.68C211.388 43.76 212.668 42.272 214.3 41.216C215.932 40.128 217.74 39.584 219.724 39.584C222.156 39.584 224.108 40.432 225.58 42.128C227.084 43.792 227.964 45.856 228.22 48.32C229.724 48.224 231.516 47.904 233.596 47.36C233.852 47.296 234.076 47.264 234.268 47.264ZM218.524 57.152C219.548 57.152 220.428 56.736 221.164 55.904C221.932 55.072 222.444 53.872 222.7 52.304C221.708 51.632 220.94 50.752 220.396 49.664C219.884 48.576 219.628 47.424 219.628 46.208C219.628 45.696 219.676 45.184 219.772 44.672H219.532C218.252 44.672 217.18 45.296 216.316 46.544C215.484 47.76 215.068 49.488 215.068 51.728C215.068 53.488 215.404 54.832 216.076 55.76C216.78 56.688 217.596 57.152 218.524 57.152ZM236.437 62.24C234.933 62.24 233.717 61.632 232.789 60.416C231.893 59.168 231.445 57.456 231.445 55.28C231.445 52.88 231.605 50.688 231.925 48.704C232.245 46.688 232.773 44.56 233.509 42.32C233.829 41.36 234.277 40.672 234.853 40.256C235.429 39.84 236.341 39.632 237.589 39.632C238.293 39.632 238.773 39.744 239.029 39.968C239.317 40.192 239.461 40.528 239.461 40.976C239.461 41.232 239.285 42.096 238.933 43.568C238.613 44.752 238.357 45.824 238.165 46.784C237.525 50.144 237.205 52.384 237.205 53.504C237.205 54.176 237.285 54.656 237.445 54.944C237.605 55.2 237.861 55.328 238.213 55.328C238.693 55.328 239.301 54.848 240.037 53.888C240.773 52.896 241.541 51.424 242.341 49.472C243.173 47.488 243.957 45.104 244.693 42.32C244.949 41.36 245.333 40.672 245.845 40.256C246.389 39.84 247.189 39.632 248.245 39.632C248.949 39.632 249.445 39.824 249.733 40.208C250.053 40.56 250.213 41.104 250.213 41.84C250.213 42.64 250.149 43.536 250.021 44.528C249.893 45.488 249.749 46.48 249.589 47.504C249.269 49.552 249.013 51.424 248.821 53.12C248.629 54.784 248.533 56.688 248.533 58.832C248.533 60.048 248.277 60.928 247.765 61.472C247.285 61.984 246.485 62.24 245.365 62.24C244.181 62.24 243.349 61.936 242.869 61.328C242.421 60.688 242.197 59.472 242.197 57.68C242.197 57.328 242.229 56.544 242.293 55.328C241.749 57.568 240.933 59.28 239.845 60.464C238.789 61.648 237.653 62.24 236.437 62.24ZM259.836 50.768C259.196 50.768 258.668 50.624 258.252 50.336C257.836 50.048 257.628 49.6 257.628 48.992L257.676 48.608C258.22 45.024 258.956 40.944 259.884 36.368C260.812 31.792 261.676 27.84 262.476 24.512C262.988 22.464 264.38 21.44 266.652 21.44C268.7 21.44 269.724 22.096 269.724 23.408C269.724 23.696 269.676 24.016 269.58 24.368C268.748 27.76 267.644 31.872 266.268 36.704C264.892 41.504 263.58 45.68 262.332 49.232C261.98 50.256 261.148 50.768 259.836 50.768ZM258.012 62.24C256.604 62.24 255.532 61.856 254.796 61.088C254.092 60.32 253.74 59.312 253.74 58.064C253.74 56.624 254.14 55.472 254.94 54.608C255.772 53.744 256.924 53.312 258.396 53.312C259.804 53.312 260.86 53.664 261.564 54.368C262.3 55.04 262.668 56.048 262.668 57.392C262.668 58.864 262.252 60.048 261.42 60.944C260.588 61.808 259.452 62.24 258.012 62.24ZM276.149 50.768C275.509 50.768 274.981 50.624 274.565 50.336C274.149 50.048 273.941 49.6 273.941 48.992L273.989 48.608C274.533 45.024 275.269 40.944 276.197 36.368C277.125 31.792 277.989 27.84 278.789 24.512C279.301 22.464 280.693 21.44 282.965 21.44C285.013 21.44 286.037 22.096 286.037 23.408C286.037 23.696 285.989 24.016 285.893 24.368C285.061 27.76 283.957 31.872 282.581 36.704C281.205 41.504 279.893 45.68 278.645 49.232C278.293 50.256 277.461 50.768 276.149 50.768ZM274.325 62.24C272.917 62.24 271.845 61.856 271.109 61.088C270.405 60.32 270.053 59.312 270.053 58.064C270.053 56.624 270.453 55.472 271.253 54.608C272.085 53.744 273.237 53.312 274.709 53.312C276.117 53.312 277.173 53.664 277.877 54.368C278.613 55.04 278.981 56.048 278.981 57.392C278.981 58.864 278.565 60.048 277.733 60.944C276.901 61.808 275.765 62.24 274.325 62.24Z" fill="black" />
                <ellipse class="shaddow" cx="155" cy="257" rx="60" ry="7" fill="black" fill-opacity="0.47" />
                <g class="star">
                    <path d="M146.995 107.582C150.342 101.066 159.658 101.066 163.005 107.582L180.91 142.433C182.217 144.976 184.654 146.748 187.477 147.204L226.155 153.463C233.387 154.633 236.265 163.493 231.103 168.69L203.491 196.488C201.475 198.516 200.544 201.382 200.982 204.208L206.982 242.927C208.103 250.167 200.567 255.642 194.029 252.338L159.059 234.667C156.507 233.377 153.493 233.377 150.941 234.667L115.971 252.338C109.433 255.642 101.897 250.167 103.018 242.927L109.018 204.208C109.456 201.382 108.525 198.516 106.509 196.488L78.8975 168.69C73.7346 163.493 76.6131 154.633 83.845 153.463L122.523 147.204C125.346 146.748 127.783 144.976 129.09 142.433L146.995 107.582Z" fill="#ffd562" />
                    <path d="M162.561 107.811L180.465 142.661C181.844 145.346 184.418 147.216 187.398 147.698L226.075 153.957C232.905 155.062 235.624 163.429 230.748 168.338L203.136 196.135C201.008 198.277 200.026 201.302 200.488 204.285L206.487 243.003C207.547 249.841 200.429 255.012 194.254 251.892L159.285 234.221C156.59 232.859 153.41 232.859 150.715 234.221L115.746 251.891C109.571 255.012 102.453 249.841 103.513 243.003L109.512 204.285C109.974 201.302 108.992 198.277 106.864 196.135L79.2522 168.338C74.3761 163.429 77.0948 155.062 83.9249 153.957L122.602 147.698C125.582 147.216 128.156 145.346 129.535 142.661L147.439 107.811C150.601 101.656 159.399 101.656 162.561 107.811Z" stroke="black" stroke-opacity="0.26" />
                    <circle cx="134" cy="171" r="9" fill="black" />
                    <circle cx="177" cy="171" r="9" fill="black" />
                    <circle cx="131" cy="167" r="1" fill="white" />
                    <circle cx="174" cy="167" r="1" fill="white" />
                    <mask id="path-9-inside-1" fill="white">
                        <path d="M172 195C172 199.243 170.314 203.313 167.314 206.314C164.313 209.314 160.243 211 156 211C151.757 211 147.687 209.314 144.686 206.314C141.686 203.313 140 199.243 140 195L156 195H172Z" />
                    </mask>
                    <path class="mouth" d="M172 195C172 199.243 170.314 203.313 167.314 206.314C164.313 209.314 160.243 211 156 211C151.757 211 147.687 209.314 144.686 206.314C141.686 203.313 140 199.243 140 195L156 195H172Z" fill="#FF331F" stroke="black" stroke-opacity="0.42" stroke-width="2" mask="url(#path-9-inside-1)" />
                </g>
                <path class="screen" d="M81 6H29.5L0 78H47L81 6Z" fill="url(#paint0_radial)" />
                <defs>
                    <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(40.5 42) rotate(90) scale(36 40.5)">
                        <stop stop-color="white" />
                        <stop offset="2" stop-color="white" stop-opacity="0.33" />
                    </radialGradient>
                </defs>
            </svg>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:'40px', alignItems:'center'}}>
            <p style={{fontSize:'24px'}}>Email: {email}</p>   
            <button class='copy' onClick={handleCopyClick} title='In case you forget your email, please copy your email and chat with our staff'>
                Copy
            </button>
            </div>
            <div class='button-sampingan'>
                <Link to={'/wig'} style={{ textDecoration: "none" }}>
                    <button className='back'>Shopping Again</button>
                </Link>
                    <button className='shopping-again' title='You can continue your shopping journey by Chat Our Staff' onClick={handleChatClick}>Chat Our Staff</button>
            </div>

        </div>
        
    )
}

export default Successfull
