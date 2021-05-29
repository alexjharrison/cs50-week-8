import { Tile } from "./tile.js";

export class Grid {
  /**
   * @param {HTMLDivElement} grid
   * @param {{speed:number, density:number, starting:number}} params
   */
  constructor(grid, params) {
    this.grid = grid;
    this.speed = (1 / params.speed) * 1000;
    this.density = params.density;
    this.starting = params.starting;
    this.interval;
    this.tiles;
    this.columns;

    this.create();
  }

  /** @param {{speed:number, density:number, starting:number}} params */
  updateSpeed(params) {
    clearInterval(this.interval);

    this.speed = (1 / params.speed) * 1000;
    setInterval(() => this.update(), this.speed);
  }

  reset({ speed, density, starting }) {
    this.speed = (1 / speed) * 1000;
    this.density = density;
    this.starting = starting;
    clearInterval(this.interval);

    while (this.grid.lastChild) {
      this.grid.removeChild(this.grid.lastChild);
    }
    this.create();
  }

  create() {
    const gridWidth = this.grid.offsetWidth;
    const gridHeight = this.grid.offsetHeight;

    const columns = this.density * 3;
    this.columns = columns;

    const sideSize = gridWidth / columns;

    const rows = Math.floor(gridHeight / sideSize);
    const numTiles = rows * columns;

    this.tiles = Array(numTiles)
      .fill()
      .map((_, i) => {
        const isLiving = Math.random() < this.starting / 100;
        const tile = new Tile(i, isLiving, sideSize);

        tile.createTile(this.grid);

        return tile;
      });

    this.interval = setInterval(() => this.update(), this.speed);
  }

  update() {
    const prevStates = this.tiles.map((tile) => tile.isLiving);
    const newStates = this.tiles.map((tile) =>
      tile.shouldBeAliveNext(this.tiles, this.columns)
    );

    if (prevStates.every((prevState, i) => prevState === newStates[i])) {
      clearInterval(this.interval);
      this.interval = undefined;
      console.log("done");
    }

    newStates.forEach((newState, i) => {
      this.tiles[i].updateTile(newState);
    });
  }
}
