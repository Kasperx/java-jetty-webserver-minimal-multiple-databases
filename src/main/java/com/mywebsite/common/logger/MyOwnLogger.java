/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.com.mywebsite.common.logger;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author cgl
 */
public class MyOwnLogger implements Logger{

    Date date;
    String className;
    String dateFormat;
    boolean debug = false;
    
    public MyOwnLogger(String className, boolean debug, int showClassLvl, String dateFormat) {
        this.dateFormat = dateFormat;
        this.className = getClassName(className, showClassLvl);
        this.debug = debug;
    }
    String getClassName(String className, int showClassLvl) {
        showClassLvl = showClassLvl<0 || showClassLvl>2? 1 : showClassLvl;
        switch(showClassLvl)
        {
        case 0:
            className = "";
            break;
        case 1:
//            className = className;
            break;
        case 2:
            className = className.split("\\.")[(className.split("\\.").length-1)];
            break;
        default:
            className = "";
            break;
        }
        return className;
    }
    String getDate() {
        date = new Date(System.currentTimeMillis());
        return new SimpleDateFormat(dateFormat).format(date);
    }
    @Override
    public void info(String text) {
        System.out.println(getDate()+" INFO "+className+": "+text);
    }
    
    @Override
    public void debug(String text) {
        if(debug) {
            System.out.println(getDate()+" DEBUG "+className+": "+text);
        }
    }
    @Override
    public void warn(String text) {
        System.out.println(getDate()+" WARN "+className+": "+text);
    }
    @Override
    public void error(String text, Exception e) {
        System.err.println(getDate()+" ERROR "+className+": "+text);
        error(e);
    }
    @Override
    public void error(String text) {
        System.err.println(getDate()+" ERROR "+className+": "+text);
    }
    @Override
    public void error(Exception error) {
        error.printStackTrace();
    }
}
