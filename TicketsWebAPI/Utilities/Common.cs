using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RESTTicketService.Utilities
{
    public class Common
    {
        //Convert Hexa to String
        public static byte[] FromHex(string hex)
        {
            byte[] raw = new byte[hex.Length / 2];
            for (int i = 0; i < raw.Length; i++)
            {
                raw[i] = Convert.ToByte(hex.Substring(i * 2, 2), 16);
            }
            return raw;
        }
    }
}