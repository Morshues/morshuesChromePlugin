// 農曆物件
var Lunar = new function() {
    // source by http://www.cnitblog.com/addone/archive/2013/03/22/63461.html
    var self = this;
    this.lunarInfo = new Array(
        0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,
        0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
        0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,
        0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
        0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,
        0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
        0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,
        0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
        0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,
        0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
        0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,
        0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
        0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,
        0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
        0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,
        0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
        0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,
        0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
        0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,
        0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
        0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,
        0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
        0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,
        0x04ba0,0x0a5b0,0x15176,0x052bf,0x0a930,
        0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,
        0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
        0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,
        0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
        0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,
        0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0);
    this.numString = "十一二三四五六七八九十";
    this.lMString = "正二三四五六七八九十冬臘";
    this.solarTerm = new Array("小寒","大寒","立春","雨水","驚蟄","春分","清明",
        "谷雨","立夏","小滿","芒種","夏至","小暑","大暑","立秋","處暑","白露","秋分",
        "寒露","霜降","立冬","小雪","大雪","冬至");
    this.solarTermBase = new Array(4,19,3,18,4,19,4,19,4,20,4,20,6,22,6,22,6,22,7,22,6,21,6,21);
    this.solarTermIdx = '0123415341536789:;<9:=<>:=1>?012@015@015@015AB78CDE8CD=1FD01GH01GH01IH01IJ0KLMN;LMBEOPDQRST0RUH0RVH0RWH0RWM0XYMNZ[MB\\]PT^_ST`_WH`_WH`_WM`_WM`aYMbc[Mde]Sfe]gfh_gih_Wih_WjhaWjka[jkl[jmn]ope]qph_qrh_sth_W';
    this.solarTermOS = '211122112122112121222211221122122222212222222221222122222232222222222222222233223232223232222222322222112122112121222211222122222222222222222222322222112122112121222111211122122222212221222221221122122222222222222222222223222232222232222222222222112122112121122111211122122122212221222221221122122222222222222221211122112122212221222211222122222232222232222222222222112122112121111111222222112121112121111111222222111121112121111111211122112122112121122111222212111121111121111111111122112122112121122111211122112122212221222221222211111121111121111111222111111121111111111111111122112121112121111111222111111111111111111111111122111121112121111111221122122222212221222221222111011111111111111111111122111121111121111111211122112122112121122211221111011111101111111111111112111121111121111111211122112122112221222211221111011111101111111110111111111121111111111111111122112121112121122111111011111121111111111111111011111111112111111111111011111111111111111111221111011111101110111110111011011111111111111111221111011011101110111110111011011111101111111111211111001011101110111110110011011111101111111111211111001011001010111110110011011111101111111110211111001011001010111100110011011011101110111110211111001011001010011100110011001011101110111110211111001010001010011000100011001011001010111110111111001010001010011000111111111111111111111111100011001011001010111100111111001010001010000000111111000010000010000000100011001011001010011100110011001011001110111110100011001010001010011000110011001011001010111110111100000010000000000000000011001010001010011000111100000000000000000000000011001010001010000000111000000000000000000000000011001010000010000000';
    this.leapMonth = function(y) {
        return (self.lunarInfo[y-1900] & 0xf);
    };
    this.leapDays = function(y) {
        if(self.leapMonth(y)) return((self.lunarInfo[y-1900] & 0x10000)? 30: 29);
        else return(0);
    };
    this.lYearDays = function(y) {
        var sum = 348;
        for(var i=0x8000; i>0x8; i>>=1) sum += (self.lunarInfo[y-1900] & i)? 1: 0;
        return(sum+self.leapDays(y));
    };
    this.monthDays = function(y,m) {
        return( (self.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 )
    }
    // 取得農曆日期
    this.getLunar = function(objDate) {
        var i, leap=0, temp=0
        var baseDate = new Date(1900,0,31)
        var offset = (objDate - baseDate)/86400000

        this.dayCyl = offset + 40
        this.monCyl = 14

        for (i=1900; i<2050 && offset>0; i++) {
            temp = self.lYearDays(i)
            offset -= temp
            this.monCyl += 12
        }

        if (offset<0) {
            offset += temp;
            i--;
            this.monCyl -= 12
        }

        this.year = i
        this.yearCyl = i-1864

        leap = self.leapMonth(i) //閏哪個月
        this.isLeap = false

        for (i=1; i<13 && offset>0; i++) {
            //閏月
            if (leap>0 && i==(leap+1) && this.isLeap==false) {
                --i; this.isLeap = true; temp = self.leapDays(this.year);
            } else { 
                temp = self.monthDays(this.year, i);
            }

            //解除閏月
            if (this.isLeap==true && i==(leap+1)) this.isLeap = false

            offset -= temp
            if (this.isLeap == false) this.monCyl ++
        }

        if (offset==0 && leap>0 && i==leap+1) {
            if (this.isLeap) {
                this.isLeap = false;
            } else {
                this.isLeap = true; --i; --this.monCyl;
            }
        }

        if (offset<0){
            offset += temp; --i; --this.monCyl;
        }

        this.month = i
        this.day = offset + 1

        return this;
    }
    // 取得中文的幾月初幾
    this.getLunarDateStr = function(date){
        var tY = date.getFullYear();
        var tM = date.getMonth();
        var tD = date.getDate();
        var l = self.getLunar(date);
        var lM = (l.month.toFixed(0)-1)%12;
        var pre = (l.isLeap) ? '閏' : '';
        var mStr = pre + self.lMString[lM] + '月';
        var lD = l.day.toFixed(0) - 1;
        pre = (lD <= 10) ? '初' : ((lD <= 19) ? '十' : ((lD <= 29) ? '廿' : '三'));
        var dStr = pre + self.numString[lD % 10];
        return mStr + dStr;
    }
    // 取得中文的初幾，若是初一則回傳月份
    this.getSimpleLunarDateStr = function(date) {
        var tY = date.getFullYear();
        var tM = date.getMonth();
        var tD = date.getDate();
        var l = self.getLunar(date);
        var lM = (l.month.toFixed(0)-1)%12;
        var pre = (l.isLeap) ? '閏' : '';
        var mStr = pre + self.lMString[lM] + '月';
        var lD = l.day.toFixed(0) - 1;
        pre = (lD <= 10) ? '初' : ((lD <= 19) ? '十' : ((lD <= 29) ? '廿' : '三'));
        var dStr = pre + self.numString[lD % 10];
        if (lD == 1) {
            return mStr;
        } else {
            return dStr;            
        }
    }
    this.sTerm = function(y,n) {
        return (self.solarTermBase[n] + Math.floor(self.solarTermOS.charAt((Math.floor(self.solarTermIdx.charCodeAt(y-1900))-48)*24+n)));
    }
    // 取得節氣字串
    this.termStr = function(date) {
        var tY = date.getFullYear();
        var tM = date.getMonth();
        var tD = date.getDate();
        return (tD == self.sTerm(tY, tM*2)) ? self.solarTerm[tM*2] : ((tD == self.sTerm(tY, tM*2+1)) ? self.solarTerm[tM*2+1] : '');
    }
};
