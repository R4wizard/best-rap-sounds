'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  audio: [],

  activate (state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    let sounds = [['horn', .12], ['pullup', .12], ['hadouken', .12], ['perfect', .12]];
    for(let i = 0; i < sounds.length; i++) {
      let audio = document.createElement('audio');
      audio.src         = 'atom://best-rap-sounds/lib/best-rap-sounds--' + sounds[i][1] + '.ogg';
      audio._loopPoint  = sounds[i][2];
      audio.currentTime = sounds[i][2];

      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'best-rap-sounds:play--' + sounds[i][1]: () => this.playAudio(i)
      }));
    }
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
    };
  },

  playAudio() {
    if (this.audio[i].currentTime > 0 && !this.audio[i].paused) {
      this.audio[i].pause();
      this.audio[i].currentTime = this.audio[i]._loopPoint;
      this.audio[i].play();
    } else {
      this.audio[i].play();
    }
  }

};
