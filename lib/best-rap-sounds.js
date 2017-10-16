'use babel';

import { CompositeDisposable } from 'atom';

let sounds = [['horn', .19], ['pullup', .12], ['hadouken', .07], ['perfect', .49]];

export default {
  subscriptions: null,

  audio: [],

  activate (state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    for(let i = 0; i < sounds.length; i++) {
      let audio = document.createElement('audio');
      audio.src         = 'atom://best-rap-sounds/lib/best-rap-sounds--' + sounds[i][0] + '.ogg';
      audio.currentTime = sounds[i][1];
      this.audio.push(audio);

      let key = 'best-rap-sounds:play-' + sounds[i][0];
      binding = {};
      binding[key] = () => this.playAudio(i);
      console.log(binding);
      this.subscriptions.add(atom.commands.add('atom-workspace', binding));
    }
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
    };
  },

  playAudio(i) {
    console.log("playing sound", i);
    if (this.audio[i].currentTime > 0 && !this.audio[i].paused) {
      this.audio[i].pause();
      this.audio[i].currentTime = sounds[i][1];
      this.audio[i].play();
    } else {
      this.audio[i].play();
    }
  }

};
