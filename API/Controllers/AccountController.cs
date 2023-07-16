using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;

        public AccountController( DataContext context)
        {
            _context = context;
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Registration(RegisterDTO dto)//(string userName , string password)
        {
            if(await UserExists(dto.userName)) return BadRequest("user Taken");
            
            //Using will dispose this class  after completing   
            using var hmac = new HMACSHA512();
            
            var user = new AppUser{
                UserName = dto.userName,
                PasswordHas = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.password)),
                PasswordSalt = hmac.Key
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<bool> UserExists(string userName)
        {
            return await _context.Users.AnyAsync(u => u.UserName == userName);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDTO dto)//(string userName , string password)
        {
            var user =await _context.Users.FirstOrDefaultAsync(x=>x.UserName == dto.userName);
            if(user == null) return Unauthorized("Invlaid User");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.password));
            for (int i = 0; i < ComputeHash.Length; i++)
            {
                if(ComputeHash[i] != user.PasswordHas[i]) return Unauthorized("Invalid Password");
            }
            return user;
        }        
    }
}