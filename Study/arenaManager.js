const serverTimeHelper = require('../util/serverTimeHelper');
const gamedb = require('../common/mysqlgame');
const dataModel = require('../common/data_models');

const config = require('./config.json');


// 아레나 정보 관리 클래스
class arenaManager {

    constructor() {
        if (arenaManager.instance) {
            
            return arenaManager.instance;
        }
        arenaManager.instance = this;

        this.allArenaSeasonList = [];   // 아레나 전체 시즌 정보
        this.currentArenaSeason = {};   // 아레나 커렌트 시즌 정보

        // 게임 db connection을 위한 game db 받아옴
        this.gameDB = new gamedb(config.gamedb_host, config.gamedb_port, config.gamedb_user, config.gamedb_password, config.gamedb_database, config.gamedb_dateStrings, config.gamedb_maxconn);
    }

    // 전체 정보 불러옴
    async initArenaAllSeasonDatas() {

        this.allArenaSeasonList = await this.getArenaSeasonData(); // 비동기 데이터 가져오기;

        if (this.allArenaSeasonList.length > 0) {
            console.log(`${serverTimeHelper.getTimeStr()}: get all arena season info: ${this.allArenaSeasonList.length}`);
            await this.initCurrentArenaSeasonData(); // 현재 시즌 데이터 초기화
        }
    }

    // 비동기 db에서 데이터 가져오기 (Promise를 반환)
    getArenaSeasonData() {
        return new Promise((resolve, reject) => {
            this.gameDB.ArenaSeasonSelectAll((_seasonList) => {
                if (_seasonList) {
                    resolve(_seasonList); // 데이터 가져오기 성공 시 resolve 호출
                } else {
                    reject(new Error("Failed to retrieve arena data")); // 에러 시 reject 호출
                }
            });
        });
    }

    // 현재 시즌 정보 가져옴
    async initCurrentArenaSeasonData() {

        let unix_now = serverTimeHelper.getUnixTime();

        //
        let currentArenaDataModel = new dataModel.currentArenaModel();
        let foundCurrentIdx = this.allArenaSeasonList.findIndex(x => ((x.started <= unix_now) && (x.ended >= unix_now)));

        // 이전 시즌 데이터
        let prevArenaSeason = 0;

        if (foundCurrentIdx >= 0) {

            let currentArena = this.allArenaSeasonList[foundCurrentIdx];

            // 찾은 현재 시즌 0보다 커야 이전 시즌을 불러올 수 있음.
            if (foundCurrentIdx > 0){
                prevArenaSeason = this.allArenaSeasonList[foundCurrentIdx - 1].season;
            }

            currentArenaDataModel.init(currentArena.season, currentArena.started, currentArena.ended, currentArena.calctime, prevArenaSeason);
        }

        this.currentArenaSeason = currentArenaDataModel;

        console.log(`${serverTimeHelper.getTimeStr()}: get current Arena Data, season: ${this.currentArenaSeason.currentSeason}, startTime: ${this.currentArenaSeason.startTime}, endTime: ${this.currentArenaSeason.endTime}, calctime: ${this.currentArenaSeason.calculateTime}, preveSeason: ${this.currentArenaSeason.prevSeason}`);
    }
}

module.exports = arenaManager;
