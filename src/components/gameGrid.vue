<template>
<div id="wrapper">
  <div id="squares" v-bind:style="{ width : Width}">
    <div class="square" v-for="square in squares" :key="square.id">
      <div class="info">
        <button @click="Click(square.id)"
        v-bind:class="{'isOccupied' : testIfOccupied(square.id),
        'canMove' : testIfCanMove(square.id),
        'isWall' : testIfWall(square.id),
        'isGold' : testIfGold(square.id),
        }">
          <a></a>
        </button>
      </div>
    </div>
  </div>
  <h1 id='actionLog'></h1>
</div>
</template>

<script>
export default {
  name: 'gameGrid',
  data() {
    return {
      Width: ((this.$root.$data.sizeX * 50) + 52) + "px",
      testOccupied: true,
    }
  },
  props: {
    squares: Array
  },
  computed: {
  },
  mounted() {
    window.addEventListener("keyup", e => {
      if (String.fromCharCode(e.keyCode) === "&") {
        this.moveUp();
      } else if (String.fromCharCode(e.keyCode) === "(") {
        this.moveDown();
      } else if (String.fromCharCode(e.keyCode) === "%") {
        this.moveLeft();
      } else if (String.fromCharCode(e.keyCode) === "'") {
        this.moveRight();
      }
    });
  },
  methods: {
    findLocation: function () {
      for (let square of this.squares) {
        if (square.occupied === true) {
          return square.id;
        }
      }
    },
    Click: function (id) {
      if (this.squares[id].occupied === true) {
        document.getElementById('actionLog').textContent = "Current location.";
        return;
      }
      if (this.squares[id].canMove === false) {
        document.getElementById('actionLog').textContent = "Can't move there.";
        return;
      }

      for (let square of this.squares) {
        if (square.occupied === true) {
          square.occupied = false;
          break;
        }
      }

      this.squares[id].occupied = true;
      document.getElementById('actionLog').textContent = "";

      if (this.squares[id].type === 'gold') {
        this.squares[id].type = "empty";
        document.getElementById('actionLog').textContent = "Gold collected!";
      }

      this.checkForCanMove(id);
    },
    leaveHover: function () {
      document.getElementById('actionLog').textContent = "";
    },
    testIfOccupied: function (id) {
      if (this.squares[id].occupied === true) {
        return true;
      }
      return false;
    },
    testIfCanMove: function (id) {
      if (this.squares[id].canMove === true) {
        return true;
      }
      return false;
    },
    testIfWall: function (id) {
      if (this.squares[id].type === "wall") {
        return true;
      }
      return false;
    },
    testIfGold: function (id) {
      if (this.squares[id].type === "gold") {
        return true;
      }
      return false;
    },
    checkForCanMove: function (id) {
      for (let square of this.squares) {
        if (square.x === this.squares[id].x + 1 && square.y === this.squares[id].y) {
          square.canMove = true;
        } else if (square.x === this.squares[id].x - 1 && square.y === this.squares[id].y) {
          square.canMove = true;
        } else if (square.x === this.squares[id].x && square.y === this.squares[id].y + 1) {
          square.canMove = true;
        } else if (square.x === this.squares[id].x && square.y === this.squares[id].y - 1) {
          square.canMove = true;
        } else {
         square.canMove = false;
        }
        if (square.type === "wall") {
          square.canMove = false;
        }
      }
    },
    moveUp: function () {
      let locationId = this.findLocation();
      let newLocationId = locationId - this.$root.$data.sizeX;
      if (newLocationId < 0) {
        document.getElementById('actionLog').textContent = "Can't move there.";
        return;
      }
      this.Click(newLocationId);
    },
    moveDown: function () {
      let locationId = this.findLocation();
      let newLocationId = locationId + this.$root.$data.sizeX;
      if (newLocationId >= this.$root.$data.sizeX * this.$root.$data.sizeY) {
        document.getElementById('actionLog').textContent = "Can't move there.";
        return;
      }
      this.Click(newLocationId);
    },
    moveLeft: function () {
      let locationId = this.findLocation();
      let newLocationId = locationId - 1;
      if (locationId % this.$root.$data.sizeX === 0) {
        document.getElementById('actionLog').textContent = "Can't move there.";
        return;
      }
      this.Click(newLocationId);
    },
    moveRight: function () {
      let locationId = this.findLocation();
      let newLocationId = locationId + 1;
      if (newLocationId % this.$root.$data.sizeX === 0) {
        document.getElementById('actionLog').textContent = "Can't move there.";
        return;
      }
      this.Click(newLocationId);
    },
  },
}
</script>

<style scoped>
#actionLog {
  height: 30px;
  min-width: 200px;
  margin-top: 50px;
  padding: 4px;
  border: 1px solid grey;
  border-radius: 5px;
  font-size: 1.2rem;
  color: #515663;
}
.canMove {
  border: 2px solid #73d1cb;
}
.isOccupied {
  background: #65bf67;
  border: 1px solid #73d1cb;
}
.isWall {
  background: #515663;
  border: none;
}
.isGold {
  background: #f0ff47;
}
#wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
#squares {
  display: flex;
  flex-wrap: wrap;
  margin: 0px;
  padding: 25px;
  background: #515663;
  border: 1px solid gray;
  border-radius: 5px;
}
.square {
  height: 50px;
  width: 50px;
}
button {
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
  height: 50px;
  width: 50px;
}
button.canMove:active {
  border: 3px solid #5c9671;
}
button:focus {
    outline: 0;
}
</style>
