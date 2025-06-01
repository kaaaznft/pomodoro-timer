class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25分を秒に変換
        this.breakTime = 5 * 60; // 5分を秒に変換
        this.isWorking = true; // 作業中かどうか
        this.isRunning = false; // タイマーが実行中かどうか
        this.timerId = null;
        
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.timerElement = document.getElementById('timer');
        this.startButton = document.getElementById('start');
        this.resetButton = document.getElementById('reset');
        this.workTimeInput = document.getElementById('workTime');
        this.breakTimeInput = document.getElementById('breakTime');
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.toggleTimer());
        this.resetButton.addEventListener('click', () => this.resetTimer());
        
        this.workTimeInput.addEventListener('change', (e) => {
            this.workTime = parseInt(e.target.value) * 60;
            if (!this.isRunning) {
                this.updateTimerDisplay();
            }
        });
        
        this.breakTimeInput.addEventListener('change', (e) => {
            this.breakTime = parseInt(e.target.value) * 60;
            if (!this.isRunning && !this.isWorking) {
                this.updateTimerDisplay();
            }
        });
    }

    toggleTimer() {
        if (this.isRunning) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.isRunning = true;
        this.startButton.textContent = '停止';
        
        this.timerId = setInterval(() => {
            if (this.isWorking) {
                if (this.workTime > 0) {
                    this.workTime--;
                    this.updateTimerDisplay();
                } else {
                    this.isWorking = false;
                    this.workTime = parseInt(this.workTimeInput.value) * 60;
                    this.breakTime = parseInt(this.breakTimeInput.value) * 60;
                    this.updateTimerDisplay();
                }
            } else {
                if (this.breakTime > 0) {
                    this.breakTime--;
                    this.updateTimerDisplay();
                } else {
                    this.isWorking = true;
                    this.breakTime = parseInt(this.breakTimeInput.value) * 60;
                    this.workTime = parseInt(this.workTimeInput.value) * 60;
                    this.updateTimerDisplay();
                }
            }
        }, 1000);
    }

    stopTimer() {
        this.isRunning = false;
        this.startButton.textContent = '開始';
        clearInterval(this.timerId);
    }

    resetTimer() {
        this.stopTimer();
        this.isWorking = true;
        this.workTime = parseInt(this.workTimeInput.value) * 60;
        this.breakTime = parseInt(this.breakTimeInput.value) * 60;
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.isWorking ? this.workTime / 60 : this.breakTime / 60);
        const seconds = Math.floor(this.isWorking ? this.workTime % 60 : this.breakTime % 60);
        
        this.timerElement.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// タイマーの初期化
const pomodoroTimer = new PomodoroTimer();
