using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.OpenApi.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using API.Services;

namespace _2_Model_a_ViewData_ViewBag_TempData_Seasion
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //________ Adding  token Services ____________
            services.AddScoped<ITokenService, TokenService>();

            //________ Adding DbContext and  Sqlite Connection __________
            services.AddDbContext<DataContext>(x=>{
                x.UseSqlite(_config.GetConnectionString("DefaultConnection"));
            });
            services.AddControllers();

            //______ Add Cores ________
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // app.UseSwagger();
                // app.UseSwaggerUI(x=>x.SwaggerEndpoint("/swagger/v1/swagger.json","ok"));
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            //_______ Cors __________
            app.UseCors(x=>{
                x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
            });

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
