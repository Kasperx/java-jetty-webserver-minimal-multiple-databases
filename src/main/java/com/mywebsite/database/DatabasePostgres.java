package main.java.com.mywebsite.database;

import java.util.ArrayList;

import org.json.JSONObject;

import main.java.com.mywebsite.Data.Person;

public class DatabasePostgres extends Database
{  
    public DatabasePostgres()
    {
        connect();
    }
    public void connect()
    {
        try{}
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }
    public void close()
    {
        try
        {
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }
    public ArrayList<Person> getData()
    {
        return getData(false);
    }
    public int getId(String name)
    {
        return -1;
    }
    public ArrayList<Person> getAllData()
    {
        return getAllData(false);
    }
    public boolean createDatabaseIfNotExists()
    {
        return true;
    }
    public void insertData()
    {
    }
    public boolean isPermitted(String name, String password)
    {
        return false;
    }
	@Override
	public boolean insertData(String[] data) {
		return false;
	}
    @Override
    public ArrayList<Person> getData(boolean withHeader)
    {
        return null;
    }
    @Override
    public ArrayList<Person> getAllData(boolean withHeader)
    {
        return null;
    }
}  

